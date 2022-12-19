/// <reference types="cypress" />
import {general} from '../page_objects/general'
import data from '../fixtures/data.json'
import { loginClass } from '../page_objects/loginFunc'
import {faker} from '@faker-js/faker'

var token ;
var gradeBookId ;

describe ('Gradebook via BackEnd', () => {

before ('Login' , () => {
    cy.intercept("POST" , 'https://gradebook-api.vivifyideas.com/api/login').as('validToken')
    cy.visit('')
    cy.url().should('contain' , '/login')
    general.headerTitle.should('be.visible')
    // .and('have.text', data.loginHeader)
    loginClass.loginFunc()
    cy.wait('@validToken').then(intercept => {
        //  console.log(intercept)
        expect(intercept.response.statusCode).to.eq(200)
        token = intercept.response.body.token
    })
})

    beforeEach ('set token to local storage' , () =>{
        window.localStorage.setItem('token' , token)
    })

    it ('Add new gradebook' , () => {
        cy.request ({
            method : 'POST',
            url : 'https://gradebook-api.vivifyideas.com/api/gradebooks/store',
            body : {
                "name" : faker.name.firstName(),
                "professor_id" : 145,

            },
            headers : {
                authorization: `Bearer ${token}`
            }

        
    }).then(response => {
        // console.log(response)
        expect(response.status).to.eq(201)
        gradeBookId = response.body.id
    })
    
})

it ('Add Student' , () =>{
    cy.request ({
        method : 'POST',
        url : 'https://gradebook-api.vivifyideas.com/api/gradebooks/students/store',
        body : {
            'first_name' : faker.name.firstName,
            'gradebook_id' : gradeBookId,
            'id ' : gradeBookId,
            'imageUrl' : "https://thumbs.dreamstime.com/b/national-flag-country-norway-gentle-silk-wind-folds-travel-concept-immigration-politics-national-flag-158566749.jpg",
            'last_name' : faker.name.lastName

        },
        headers : {
            authorization: `Bearer ${token}`
        }
    }).then(response =>{
        console.log(response)
        expect(response.status).to.eq(200)
    
    })

})

it ('Delete gradebook' , () =>{
    cy.request ({
        method : 'DELETE',
        url : `https://gradebook-api.vivifyideas.com/api/gradebooks/${gradeBookId}`,
        headers : {
            authorization: `Bearer ${token}`
        }

    }).then((response) =>{
        expect(response.status).to.eq(200)
    })


})







})