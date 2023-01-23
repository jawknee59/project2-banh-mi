# Johnny's Banh Mi

# Overview

A banh mi restaurant API allows you to access and integrate with the database so you can register, browse through menu, leave a review, and add items to cart and favorites.

# Technologies Used

- HTML
- CSS
- JavaScript
- MongoDb
- Mongoose
- Postman
- bcryptjs
- Liquid express views

# User Stories

As a user, I want the ability to:

- Sign up
- Sign in
- Sign out
- Browse through different sandwiches
- Add items to cart
- Add items to favorites
- Able to write a review and rating

# Wireframes
![Home Page](https://user-images.githubusercontent.com/26725511/214085908-c2291cb4-e506-42f5-9c14-b7ebce4baadf.png)
![Sign Up Page](https://user-images.githubusercontent.com/26725511/214085938-a3c40087-6f67-4656-9ed1-3f85762a2b43.png)
![Log In Page](https://user-images.githubusercontent.com/26725511/214085987-37cb783c-f7f1-4d1b-87c6-76153467e672.png)
![Banh Mi Page](https://user-images.githubusercontent.com/26725511/214086566-22c159bc-2b9f-4d5e-a7a1-d0acb8a48365.png)

# ERD
![Project2-ERD](https://user-images.githubusercontent.com/26725511/214086707-c252525d-d47b-4d44-94cf-a67c797b47a1.png)

#### Banh Mi

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /banhMi/         | GET          | index  
| /banhMi/:id      | GET          | show       
| /banhMi/new      | GET          | new   
| /banhMi          | POST         | create   
| /banhMi/:id/edit | GET          | edit       
| /banhMi/:id      | PATCH/PUT    | update    
| /banhMi/:id      | DELETE       | destroy  

#### Review

| **URL**                              | **HTTP Verb**|**Action**|
|--------------------------------------|--------------|----------|
| /reviews/:banhMiId                   | POST         | create  
| /reviews/delete/:BanhMiId/:reviewId  | DELETE       | destroy       


#### Users

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /users/signup    | GET          | new  
| /users/signup    | POST         | create  
| /users/login     | GET          | login       
| /users/login     | POST         | create       
| /users/logout    | DELETE       | destroy   

