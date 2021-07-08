const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");

const mongoose = require("mongoose");
const XLSX = require("xlsx");

const Agent = require("../models/agentModel");
const PolicyCarrier = require("../models/policyCarrierModel");
const PolicyCategory = require("../models/policyCategoryModel");
const PolicyInfo = require("../models/policyInfo");
const UserAccount = require("../models/userAccountModel");
const User = require("../models/userModel");
const connectDB = require("../utils/connectdb");
const uploadDataToDB = require("../utils/uploadDataToDB");

connectDB();

const filePath = workerData;

const workbook = XLSX.readFile(filePath, { cellDates: true });

const sheetNames = workbook.SheetNames;

let xlsxJSON = "";

sheetNames.forEach((sheet) => {
  xlsxJSON = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
    defVal: "",
  });
});

const agentNames = {};
const userAccount = {};
const policyCategory = {};
const policyCarrier = {};
const user = {};
const policyInfo = [];

xlsxJSON.forEach((elem) => {
  agentNames[elem.agent] = { agentName: elem.agent };
  userAccount[elem.account_name] = { accountName: elem.account_name };
  policyCategory[elem.category_name] = { categoryName: elem.category_name };
  policyCarrier[elem.company_name] = {
    _id: new mongoose.mongo.ObjectId(),
    companyName: elem.company_name,
  };
  user[elem.email] = {
    _id: new mongoose.mongo.ObjectId(),
    firstName: elem.firstname,
    dob: elem.dob,
    address: elem.address,
    phone: elem.phone.toString().replace(/[- )(]/g, ""),
    state: elem.state,
    zip: elem.zip,
    email: elem.email,
    gender: elem.gender || null,
    userType: elem.userType,
  };
  policyInfo.push({
    policyNumber: elem.policy_number,
    policyStartDate: elem.policy_start_date,
    policyEndDate: elem.policy_end_date,
    policyCategory: elem.category_name,
    company: elem.company_name,
    user: elem.email,
  });
});

policyInfo.forEach((policy) => {
  policy.user = user[policy.user]._id;
  policy.company = policyCarrier[policy.company]._id;
});

const uploadDB = [
  { model: Agent, values: Object.values(agentNames) },
  { model: PolicyCarrier, values: Object.values(policyCarrier) },
  { model: UserAccount, values: Object.values(userAccount) },
  { model: PolicyCategory, values: Object.values(policyCategory) },
  { model: User, values: Object.values(user) },
  { model: PolicyInfo, values: policyInfo },
];

uploadDataToDB(uploadDB);

fs.unlink(filePath, () => console.log("file deleted"));

parentPort.postMessage("Initiated uploading data to DB");
