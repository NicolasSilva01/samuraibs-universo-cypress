const { defineConfig } = require("cypress");

const { Pool } = require ('pg');

const pool = new Pool ({

  host: 'queenie.db.elephantsql.com',
  user: 'xnsodhoi',
  password: 'cCJ3fleZCbYH2SVJxgYodI3XDs0hl88O',
  database: 'xnsodhoi',
  port: 5432

 })

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

       //implement node event listeners here

       on('task', {

        removeUser(Email) {
      
          return new Promise(function(resolve){
      
            pool.query('DELETE FROM public.users WHERE email = $1', [Email], function(error, result){
      
              if (error){
        
                throw error
        
              }
      
              resolve({success: result})
        
            })
      
          })
      
        }
      
      })
   },

   "baseUrl": 'http://localhost:3000'
 },

});







