const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let items = [{ "id": 1, "name": "Item A", "price": 10 }];

app.get('/items', (req, res) => {
    res.json({ message: 'Listando todos os itens!', items });
});

app.post('/items', (req, res) => {
    const newItem = req.body; 
    items.push(newItem); 
    res.status(201).json({ message: 'Item adicionado com sucesso!', item: newItem });
});

app.put('/items/:id', (req, res) => {
    const { id } = req.params; 
    const updatedData = req.body; 
    
    const index = items.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: `Item com ID ${id} não encontrado.` });
    }

   
    items[index] = { ...items[index], ...updatedData };
    res.json({ message: `Item com ID ${id} atualizado com sucesso!`, item: items[index] });
});


app.delete('/items/:id', (req, res) => {
    const { id } = req.params; 

    const index = items.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: `Item com ID ${id} não encontrado.` });
    }

    const deletedItem = items.splice(index, 1); 
    res.json({ message: `Item com ID ${id} removido com sucesso!`, item: deletedItem });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
