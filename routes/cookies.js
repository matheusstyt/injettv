
const router = require('express').Router()


router.get('/', (req, res, next)=>{
    res.send('Hello ')
}); 
router.get('/set-cookie', (req, res, next)=>{
    res.cookie('teste', 'aaa')
    res.send('cookie is set ')
});
module.exports = router;