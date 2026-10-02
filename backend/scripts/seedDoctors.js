import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

import doctorModel from "../models/doctorModel.js";
import connectDB from "../config/mongodb.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const doctors = [
    {
        name: "Dr. Richard James",
        email: "richard.james@appointy.test",
        speciality: "General physician",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Richard James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 50,
        address: {
            line1: "17th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc1.png"
    },
    {
        name: "Dr. Emily Larson",
        email: "emily.larson@appointy.test",
        speciality: "Gynecologist",
        degree: "MBBS",
        experience: "3 Years",
        about: "Dr. Emily Larson has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 60,
        address: {
            line1: "27th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc2.png"
    },
    {
        name: "Dr. Sarah Patel",
        email: "sarah.patel@appointy.test",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "1 Years",
        about: "Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 30,
        address: {
            line1: "37th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc3.png"
    },
    {
        name: "Dr. Christopher Lee",
        email: "christopher.lee@appointy.test",
        speciality: "Pediatricians",
        degree: "MBBS",
        experience: "2 Years",
        about: "Dr. Christopher Lee has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 40,
        address: {
            line1: "47th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc4.png"
    },
    {
        name: "Dr. Jennifer Garcia",
        email: "jennifer.garcia@appointy.test",
        speciality: "Neurologist",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Jennifer Garcia has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 50,
        address: {
            line1: "57th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc5.png"
    },
    {
        name: "Dr. Andrew Williams",
        email: "andrew.williams@appointy.test",
        speciality: "Neurologist",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Andrew Williams has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 50,
        address: {
            line1: "57th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc6.png"
    },
    {
        name: "Dr. Christopher Davis",
        email: "christopher.davis@appointy.test",
        speciality: "General physician",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Christopher Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 50,
        address: {
            line1: "17th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc7.png"
    },
    {
        name: "Dr. Timothy White",
        email: "timothy.white@appointy.test",
        speciality: "Gynecologist",
        degree: "MBBS",
        experience: "3 Years",
        about: "Dr. Timothy White has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 60,
        address: {
            line1: "27th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc8.png"
    },
    {
        name: "Dr. Ava Mitchell",
        email: "ava.mitchell@appointy.test",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "1 Years",
        about: "Dr. Ava Mitchell has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 30,
        address: {
            line1: "37th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc9.png"
    },
    {
        name: "Dr. Jeffrey King",
        email: "jeffrey.king@appointy.test",
        speciality: "Pediatricians",
        degree: "MBBS",
        experience: "2 Years",
        about: "Dr. Jeffrey King has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 40,
        address: {
            line1: "47th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc10.png"
    },
    {
        name: "Dr. Zoe Kelly",
        email: "zoe.kelly@appointy.test",
        speciality: "Neurologist",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Zoe Kelly has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 50,
        address: {
            line1: "57th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc11.png"
    },
    {
        name: "Dr. Patrick Harris",
        email: "patrick.harris@appointy.test",
        speciality: "Gastroenterologist",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Patrick Harris has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 50,
        address: {
            line1: "57th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc12.png"
    },
    {
        name: "Dr. Chloe Evans",
        email: "chloe.evans@appointy.test",
        speciality: "General physician",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Chloe Evans has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 50,
        address: {
            line1: "17th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc13.png"
    },
    {
        name: "Dr. Ryan Martinez",
        email: "ryan.martinez@appointy.test",
        speciality: "Gynecologist",
        degree: "MBBS",
        experience: "3 Years",
        about: "Dr. Ryan Martinez has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 60,
        address: {
            line1: "27th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc14.png"
    },
    {
        name: "Dr. Amelia Hill",
        email: "amelia.hill@appointy.test",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "1 Years",
        about: "Dr. Amelia Hill has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
        fees: 30,
        address: {
            line1: "37th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        },
        image: "doc15.png"
    }
];

const seedDoctors = async () => {
    try {
        await connectDB();

        if (!process.env.SEED_DOCTOR_PASSWORD) {
        throw new Error("SEED_DOCTOR_PASSWORD is missing in .env");
        }

        const hashedPassword = await bcrypt.hash(
        process.env.SEED_DOCTOR_PASSWORD,
        10
        );

        const assetsPath = path.resolve(__dirname, "../../frontend/src/assets");

        for (const doctor of doctors) {

            const existingDoctor = await doctorModel.findOne({
                email: doctor.email
            });

            if (existingDoctor) {
                console.log(`Skipping ${doctor.name} - already exists`);
                continue;
            }

            const imagePath = path.join(assetsPath, doctor.image);

            console.log(`Uploading image for ${doctor.name}...`);

            const uploadResult = await cloudinary.uploader.upload(imagePath, {
                resource_type: "image",
                folder: "appointy/doctors"
            });

            await doctorModel.create({
                name: doctor.name,
                email: doctor.email,
                password: hashedPassword,
                image: uploadResult.secure_url,
                speciality: doctor.speciality,
                degree: doctor.degree,
                experience: doctor.experience,
                about: doctor.about,
                available: true,
                fees: doctor.fees,
                slots_booked: {},
                address: doctor.address,
                date: Date.now()
            });

            console.log(`Added ${doctor.name}`);
        }

        console.log("=================================");
        console.log("Doctor seeding completed!");
        console.log("=================================");

        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error("SEED ERROR:", error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedDoctors();