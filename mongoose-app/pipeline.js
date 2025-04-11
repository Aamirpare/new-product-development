//Multistage aggregation pipeline - humandb users collection
db.users.aggregate([
    { $group: { _id: "$name", maxAge: { $max: "$age" }, total: { $count: {} } } },
    { $set: { fullName: "$_id" } },
    { $sort: { maxAge: 1 } },
    { $limit: 5 }
]);
//Output
/* 
    [
    { _id: 'Sameel', maxAge: 18, total: 2, fullName: 'Sameel' },
    { _id: 'Veronika', maxAge: 22, total: 3, fullName: 'Veronika' },
    { _id: 'Eva Maria', maxAge: 27, total: 2, fullName: 'Eva Maria' },
    { _id: 'Aamir', maxAge: 34, total: 4, fullName: 'Aamir' }
    ]
*/




/*
ExaminationDB students Collection
[
  {
    _id: ObjectId("6701339b4eddfa9390be3c0b"),
    fullName: 'Aamir Pare',
    email: 'aamirpare@gmail.com',
    age: 32,
    cell: '0300-5345391'
  },
  {
    _id: ObjectId("6703ace16f2d969644ec989c"),
    fullName: 'Fauzia Irshad',
    email: 'fauzia.irshad@gmail.com',
    age: 31,
    cell: '03004592190'
  },
  {
    _id: ObjectId("67f2696f2d396d276c69d5f4"),
    student_id: 'P0002',
    class: 102,
    section: 'A',
    course_fee: 8
  },
  {
    _id: ObjectId("67f2696f2d396d276c69d5f5"),
    student_id: 'P0002',
    class: 101,
    section: 'A',
    course_fee: 12
  },
  {
    _id: ObjectId("67f2696f2d396d276c69d5f6"),
    student_id: 'P0001',
    class: 101,
    section: 'A',
    course_fee: 12
  },
  {
    _id: ObjectId("67f2696f2d396d276c69d5f7"),
    student_id: 'P0004',
    class: 103,
    section: 'B',
    course_fee: 19
  }
]


    Create a muti-stage aggregate pipeline matches the students which obtained "A" grade
    groupped by the "student_id", sort on student_id by descending order, and finally project the following fields
    _id, total, count, sum, half 
    wher _id is a student_id, total is sum of course_fee, count is document count, sum is total, half is total/2 
    
    and the following result is shown:
    [
        { _id: 'P0002', total: 20, count: 2, sum: 20, half: 10 },
        { _id: 'P0001', total: 12, count: 1, sum: 12, half: 6 }
    ]
    
*/

db.students.aggregate([
    { $match: { section: "A" } },
    { $group: { _id: "$student_id", total: { $sum: "$course_fee" }, count: { $count: {} } } },
    { $sort: { _id: -1 } },
    { $project: { _id: 1, total: 1, count: 1, sum: "$total", half: { $divide: ["$total", 2] } } }
])


//Using commandline to import or export data to mongodb.

//IMPORT JSON COLLECTION
//mongoimport -d BooksDB -c users --file C:/users/aamir/xyz.json --jsonArray
//mongoimport /uri:mongodb://127.0.0.1:27017 -d BooksDB -c users --file C:/users/aamir/xyz.json --jsonArray

//EXPORT JSON COLLECTION
//mongoexport /uri:mongodb://127.0.0.1:27017 -d BooksDB -c book -o c:/users/aamir/xyz.json --jsonArray --pretty
//mongoexport  -d BooksDB -c book -o c:/users/aamir/xyz.json --jsonArray --pretty

//Generate the json records online use the following url link
//https://www.coderstool.com/json-test-data-generator