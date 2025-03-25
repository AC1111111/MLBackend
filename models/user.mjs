import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    HomeFoodExpenditure: {
        type: Number,
        default: 0.0
    },
    RestaurantAndHotelExpenditure: {
        type: Number,
        default: 0.0
    },
    ClothingExpenditure: {
        type: Number,
        default: 0.0
    },
    HousingExpenditure: {
        type: Number,
        default: 0.0
    },
    Rent: {
        type: Number,
        default: 0.0
    },
    PublicTransportationExpenditure: {
        type: Number,
        default: 0.0
    },
    CommExpenditure: {
        type: Number,
        default: 0.0
    },
    MiscelleneousExpenditure: {
        type: Number,
        default: 0.0
    },
    BusinessCash: {
        type: Number,
        default: 0.0
    },
    PersonalVehicleExpenditure: {
        type: Number,
        default: 0.0
    },
    TransactionDate:{
        type: Date,
        default: Date.now
    }
})

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    transactionData:{
        type: transactionSchema
    },
    salary:{
        type: Number,
        required: true
    }
})

const user = mongoose.model('user', userSchema);
export default user;