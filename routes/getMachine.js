const express = require('express');
const router = express.Router();
//const data = gts.data.gts, configPath: `${process.env.APP_URL}:${process.env.PORT
fetch(`${process.env.APP_URL}:${process.env.PORT}`)
.then(res => console.log(`res: `, res))
router.use((req, res, next)=>{
    res.status(201).send({
        msg: `get ok`,
        res


    });
})

module.exports = router;