package com.gestionS.controller;


import com.gestionS.model.Product;
import com.gestionS.model.Transaction;
import com.gestionS.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
public class ProductController {

    @Autowired
    ProductRepo productRepo;

    @GetMapping("/productList")
    public List<Product> getProductList(){
        return productRepo.findAll();
    }

    @GetMapping("/product")
    public Optional<Product> getProductById(@RequestParam Long id){
        return productRepo.findById(id);
    }

    @PostMapping("/product")
    public Product saveProduct(@RequestBody Product product){
    	Optional<Product> prod = productRepo.findById(product.getId());
    	List<Transaction> transactionList = prod.get().getTransactionList();
    	for(Transaction trans : product.getTransactionList()) {
    		if (trans.getId()==null) {
    			transactionList.add(trans);
    		}
    	}
    	
    	
        return productRepo.save(product);
    }

    @DeleteMapping("/product")
    public void deleteProduct(@RequestParam Long id){
        productRepo.deleteById(id);
    }

}
