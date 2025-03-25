import express from 'express';
import user from '../models/user.mjs';
import db from "../db/dbconn.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("UserData");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.post("/", async (req, res) => {
    let collection = await db.collection("UserData");
    let result = await collection.insertOne(req.body);
    res.send(result).status(204);
})

router.get("/gettransactions", async (req, res) => {
    let collection = await db.collection("UserData");
    let results = await collection.aggregate().toArray();
    let trimmedResult = [{}];
    results.forEach((result) => {
        if (result.Rent > 0) {
            trimmedResult.push({ 
                Category: "Rent",
                Amount: result.Rent,
                Date: result.Date
             });
        }
        else if (result.ClothingExpenditure > 0) {
            trimmedResult.push({
                Category: "Clothing Expenditure", 
                Amount: result.ClothingExpenditure,
                Date: result.Date
             });
        }
        else if (result.HomeFoodExpenditure > 0) {
            trimmedResult.push({ 
                Category: "Home Food Expenditure", 
                Amount: result.HomeFoodExpenditure,
                Date: result.Date
             });
        }
        else if (result.HousingExpenditure > 0) {
            trimmedResult.push({ 
                Category: "Housing Expenditure", 
                Amount: result.HousingExpenditure,
                Date: result.Date
             });
        }
        else if (result.RestaurantAndHotelExpenditure > 0) {
            trimmedResult.push({ 
                Category: "Restaurant And Hotel Expenditure", 
                Amount: result.RestaurantAndHotelExpenditure,
                Date: result.Date
             });
        }
        else if (result.PublicTransportationExpenditure > 0) {
            trimmedResult.push({ 
                Category: "Public Transportation Expenditure", 
                Amount: result.PublicTransportationExpenditure,
                Date: result.Date
             });
        }
        else if (result.CommExpenditure > 0) {
            trimmedResult.push({ 
                Category: "Comm Expenditure", 
                Amount: result.CommExpenditure,
                Date: result.Date
             });
        }
        else if (result.MiscelleneousExpenditure > 0) {
            trimmedResult.push({ 
                Category: "Miscelleneous Expenditure", 
                Amount: result.MiscelleneousExpenditure,
                Date: result.Date
             });
        }
        else if (result.BusinessCash > 0) {
            trimmedResult.push({ 
                Category: "Business Cash", 
                Amount: result.BusinessCash,
                Date: result.Date
             });
        }
        else if (result.PersonalVehicleExpenditure > 0) {
            trimmedResult.push({ 
                Category: "Personal Vehicle Expenditure", 
                Amount: result.PersonalVehicleExpenditure,
                Date: result.Date
             });
        }
    });
    res.send(trimmedResult);
})

router.get("/categoryspent", async (req, res) => {
    let collection = await db.collection("UserData");
    let aggs = await collection.aggregate().toArray();
    let result = {};
    let HomeFoodExpenditure = 0;
    let RestaurantAndHotelExpenditure = 0;
    let ClothingExpenditure = 0;
    let HousingExpenditure = 0;
    let Rent = 0;
    let PublicTransportationExpenditure = 0;
    let CommExpenditure = 0;
    let MiscelleneousExpenditure = 0;
    let BusinessCash = 0;
    let PersonalVehicleExpenditure = 0;
    aggs.forEach((agg) => {
        HomeFoodExpenditure = HomeFoodExpenditure + agg.HomeFoodExpenditure;
        RestaurantAndHotelExpenditure = RestaurantAndHotelExpenditure + agg.RestaurantAndHotelExpenditure;
        ClothingExpenditure = ClothingExpenditure + agg.ClothingExpenditure;
        HousingExpenditure = HousingExpenditure + agg.HousingExpenditure;
        Rent = Rent + agg.Rent;
        PublicTransportationExpenditure = PublicTransportationExpenditure + agg.PublicTransportationExpenditure;
        CommExpenditure = CommExpenditure + agg.CommExpenditure;
        MiscelleneousExpenditure = MiscelleneousExpenditure + agg.MiscelleneousExpenditure;
        BusinessCash = BusinessCash + agg.BusinessCash;
        PersonalVehicleExpenditure = PersonalVehicleExpenditure + agg.PersonalVehicleExpenditure;
    })
    result = {
        HomeFoodExpenditure: HomeFoodExpenditure,
        RestaurantAndHotelExpenditure: RestaurantAndHotelExpenditure,
        ClothingExpenditure: ClothingExpenditure,
        HousingExpenditure: HousingExpenditure,
        Rent: Rent,
        PublicTransportationExpenditure: PublicTransportationExpenditure,
        CommExpenditure: CommExpenditure,
        MiscelleneousExpenditure: MiscelleneousExpenditure,
        BusinessCash: BusinessCash,
        PersonalVehicleExpenditure: PersonalVehicleExpenditure
    }
    res.send(result);
})


router.get("/totalspent", async(req, res) => {
    let total = 0;
    let collection = await db.collection("UserData");
    let aggs = await collection.aggregate().toArray();
    aggs.forEach((result) => {
        if (result.Rent > 0) {
            total = total + result.Rent;
        }
        else if (result.ClothingExpenditure > 0) {
            total = total + result.ClothingExpenditure;
        }
        else if (result.HomeFoodExpenditure > 0) {
            total = total + result.HomeFoodExpenditure;
        }
        else if (result.HousingExpenditure > 0) {
            total = total + result.HousingExpenditure;
        }
        else if (result.RestaurantAndHotelExpenditure > 0) {
            total = total + result.RestaurantAndHotelExpenditure;
        }
        else if (result.PublicTransportationExpenditure > 0) {
            total = total + result.PublicTransportationExpenditure;
        }
        else if (result.CommExpenditure > 0) {
            total = total + result.CommExpenditure;
        }
        else if (result.MiscelleneousExpenditure > 0) {
            total = total + result.MiscelleneousExpenditure;
        }
        else if (result.BusinessCash > 0) {
            total = total + result.BusinessCash;
        }
        else if (result.PersonalVehicleExpenditure > 0) {
            total = total + result.PersonalVehicleExpenditure;
        }
    });
    res.send({TotalSpent: total})
})


/*router.post("/register", async (req, res) => {
    const { UserName, Password, Salary } = req.body;
    let collection = await db.collection("UserData");
    const userExists = await collection.findOne({ UserName });

    if (userExists) {
        throw new Error('User Already Exists');
    }

    const user = await collection.insertOne({
        UserName,
        Password,
        Salary
    });

    if (user) {
        res.status(201).json(user);
    }
    else {
        res.status(400)
        throw new Error("Unkown Error");
    }
})

router.post("/login", async (req, res) => {
    const { UserName, Password } = req.body;
    let collection = await db.collection("UserData");
    const user = await collection.findOne({ UserName });
    if (user && user.Password === req.body.Password) {
        res.json(user);
    }
    else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
})*/

export default router;