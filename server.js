const express = require('express');	
const path = require('path');	
const port = process.env.PORT || 8080;	
const app = express();


app.use(express.static(__dirname));	
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));	 
});

app.listen(process.env.PORT || 3000, function(){	
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);