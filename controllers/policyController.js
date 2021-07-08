const User = require("../models/userModel");
const PolicyCarrier = require("../models/policyCarrierModel");
const PolicyInfo = require("../models/policyInfo");

exports.getPolicyByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) res.status(404).json({ error: "User not found" });

    const policies = await PolicyInfo.find({ user: user._id }).populate(
      "company"
    );

    if (!policies) res.status(404).json({ error: `no policies by ${email}` });

    res.status(200).json({
      status: "success",
      data: {
        data: policies,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getAggregatePolicy = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;

    const skip = (page - 1) * limit;

    const aggr = await PolicyInfo.aggregate([
      { $match: {} },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { page: page, limit: limit } },
          ],
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $group: {
                _id: "$user",
                count: { $sum: 1 },
                policies: {
                  $addToSet: {
                    _id: "$_id",
                    policyNumber: "$policyNumber",
                    policyStartDate: "$policyStartDate",
                    policyEndDate: "$policyEndDate",
                    policyCategory: "$policyCategory",
                    company: "$company",
                  },
                },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user",
              },
            },
          ],
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: aggr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
