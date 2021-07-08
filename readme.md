# insuredmine

Routes to upload CSV/XLSX, get policies by email of the user and to get aggregate policies are created for this assessment.

For this assessment it is assumed that email of users and policy number are unique.

## POST Upload File

```http
http://localhost:3000/api/v1/data/upload
```

Please attach a CSV/XLSX file with all the required data along with the request. The process of reading data from the uploaded file and uploading into the database is done in a separate worker thread.

## GET Get Policies By Email

```http
http://localhost:3000/api/v1/policy/getPolicies/
```

This route requires email of the user in the body. You will receive list of all policies of that user as response.

#### BODY raw

```json
{
  "email": "madler@yahoo.ca"
}
```

## GET Get Aggregate Policies

```http
http://localhost:3000/api/v1/policy/getAggregatePolicy/?page=5&limit=50
```

This route will return a paginated list of all policies of each user. Limit and page number can be controlled by adding it in the query parameters.

| PARAMS | VALUES |
| ------ | ------ |
| page   | 5      |
| limit  | 50     |
