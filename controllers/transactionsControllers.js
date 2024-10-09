const express = require('express')
const transactionData = require(`../model/transactions`)
const transactionRouter = express.Router()

// localhost:4001/budget/     4001 all end points 
transactionRouter.get(`/`, (req,res) =>{ 
    res.json(transactionData)
})

//gets single item
transactionRouter.get(`/:arrayIndex`, (req, res) => {
    const { arrayIndex } = req.params;
    const index = parseInt(arrayIndex, 10); // Convert the index to an integer

    // Check if index is a valid number
    if (isNaN(index)) {
        return res.status(400).json({ error: "Invalid index provided." });
    }

    // Check if index is within bounds of the transactionData array
    if (index < 0 || index >= transactionData.length) {
        return res.status(404).json({ error: "Transaction not found." });
    }

    // Send the transaction data as JSON
    res.json(transactionData[index]);
});

//post
transactionRouter.post('/',(req,res) =>{
    req.body.id = transactionData[transactionData.length -1].id + 1

    transactionData.push(req.body)
    
    res.json(transactionData[transactionData.length -1])
})

//show
transactionRouter.get('/:id', (req,res) =>{
    const { id } = req.params
    if(transactionData[id]){
        res.json(transactionData[id])

    }else{
        res.status(404).json({ error: "page not found" });

    }
})

//deletes
transactionRouter.delete('/:id',(req,res) =>{
     const {id} = req.params
    if(transactionData[id]){
        const deletedLog = transactionData.splice(+id, 1)
        res.status(200).json(deletedLog)
    }else{
        res.status(404).json({error:"log not found"})
    }
})



//update 
transactionRouter.put('/:id',(req,res) =>{
    const { id } = req.params

    transactionData.splice(+id, 1, req.body)
    if(transactionData[id]){
        res.status(200).json(transactionData[+id])
    }else{
        res.status(404).json({error:"id out of bounds"})
    }

    
})

module.exports = transactionRouter;