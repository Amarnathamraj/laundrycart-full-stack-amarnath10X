const express = require('express');
const userCollection = require('../model/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'amarnath';
const { body, validationResult } = require('express-validator');

// Register Route
router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 4, max: 17 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }

            const {
                name,
                email,
                phone,
                state,
                district,
                address,
                pincode,
                password
            } = req.body;

            const existingUser = await userCollection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Email already registered'
                });
            }

            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json({ status: "failed", message: err.message });
                }

                await userCollection.create({
                    name,
                    email,
                    phone,
                    state,
                    district,
                    address,
                    pincode,
                    password: hash
                });

                res.json({
                    status: 'success',
                    message: "Registration successful"
                });
            });

        } catch (err) {
            return res.status(500).json({ status: "failed", message: err.message });
        }
    }
);

// Login Route
router.post('/login',
    body('email').notEmpty(),
    body('password').notEmpty(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }

            const { email, password } = req.body;
            const data = await userCollection.findOne({ email });
           
            if (!data) {
               
                return res.status(404).json({
                    status: 'failed',
                    message: 'User not registered'
                });
            }

            bcrypt.compare(password, data.password, async function (err, result) {
                if (err) {
                    return res.status(500).json({ status: 'failed', message: err.message });
                }

                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: data._id
                    }, secret);

                    res.json({
                        status: 'success',
                        token
                    });
                } else {
                    res.status(401).json({
                        status: 'failed',
                        message: 'user not registered'
                    });
                }
            });

        } catch (err) {
            res.status(500).json({ status: 'failed', message: err.message });
        }
    }
);

module.exports = router;
