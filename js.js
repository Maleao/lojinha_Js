class Product  
{ 
    constructor() 
    { 
        this.id = 1; 
        this.arrayProducts = [] 
        this.editId = null;
    } 
     
    save() 
    { 
      let product = this.readData(); 
      if(this.ValidateField(product) == true)  
      { 
        if(this.editId == null){ 
            this.add(product)
        } else  {
            this.update(this.editId, product)
        }
        
      } 
       
      this.tablelist(); 
      this.cancel();

    } 
    
    tablelist(){ 
        let tbody = document.getElementById('tbody'); 
        tbody.innerText = ''; 
         
        for(let i = 0; i < this.arrayProducts.length; i++)  
        { 
            let tr = tbody.insertRow(); 
            let td_id = tr.insertCell(); 
            let td_product = tr.insertCell(); 
            let td_price = tr.insertCell(); 
            let td_acoes = tr.insertCell();  

            td_id.innerText = this.arrayProducts[i].id;
            td_product.innerText = this.arrayProducts[i].nameProduct;
            td_price.innerText = this.arrayProducts[i].price; 

            td_id.classList.add('center')  

            let imgEdit = document.createElement('img') 
            imgEdit.src = 'img/register.png' 
            imgEdit.setAttribute('onclick', 'product.prepareEdit('+ JSON.stringify(this.arrayProducts[i]) +')'); 
            let imgDelete = document.createElement('img') 
            imgDelete.src = 'img/delete.png' 
            imgDelete.setAttribute('onclick', 'product.delete('+ this.arrayProducts[i].id  +')'); 

            td_acoes.appendChild(imgEdit); 
            td_acoes.appendChild(imgDelete); 
             
            td_acoes.classList.add('center')
        }
    } 

    add(product) 
    {  
        product.price = parseFloat(product.price)
        this.arrayProducts.push(product); 
        this.id++
    } 

    prepareEdit(date)  
    {  
        this.editId = date.id; 

        document.getElementById('produto').value = date.nameProduct;
        document.getElementById('preço').value = date.price; 

        document.getElementById('btn1').innerText = 'Atualizar'
    } 

    update(id, product)  
    { 
        for(let i = 0; i < this.arrayProducts.length; i++) 
            if(this.arrayProducts[i].id == id)  
            { 
                this.arrayProducts[i].nameProduct = product.nameProduct
                this.arrayProducts[i].price = product.price
            }
    }
    
    readData() 
    { 
        let product = {} 
         
        product.id = this.id;
        product.nameProduct = document.getElementById('produto').value;
        product.price = document.getElementById('preço').value; 

        return product;
    } 

    ValidateField(product) 
    {  
        let msg = ''; 

        if(product.nameProduct == '') 
        { 
            msg += '- Informe o Nome do produto\n'
        }
        if(product.price == '') 
        { 
            msg += '- Informe o Preço do produto\n'
        } 
        if(msg != '') { 
            alert(msg) 
            return false;
        } 
        return true;
    }

    cancel() 
    { 
        document.getElementById('produto').value = ''
        document.getElementById('preço').value = '' 

        document.getElementById('btn1').innerText = 'Salvar' 
        this.editId = null
    } 

    delete(id) {   
        if(confirm('Deseja realmente deletar o produto do ID '+ id )) {

            let tbody = document.getElementById('tbody'); 
            
            for(let i = 0; i < this.arrayProducts.length; i++)  
            { 
                if(this.arrayProducts[i].id == id)  
                { 
                    this.arrayProducts.splice(i, 1); 
                    tbody.deleteRow(i);
                }
            } 
        } 
    }
} 

var product = new Product() 