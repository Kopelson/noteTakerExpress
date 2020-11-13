# Note Taker Express
This application uses an Express backend to write, save, and delete notes.

## Overview

App link: https://sleepy-ocean-58474.herokuapp.com/

![home](https://user-images.githubusercontent.com/57735283/98990936-fe701f80-24df-11eb-9dbb-24536d13b2ab.PNG)

## Project Description

* The application frontend has already been created, and it was my job to build the backend and connect the two.

* The following HTML routes that I created:

  * GET `/notes` - Should return the `notes.html` file. <br>
  ![notes](https://user-images.githubusercontent.com/57735283/99102442-edccb180-2592-11eb-8a54-231d432d39cb.gif)

  * GET `*` - Should return the `index.html` file

* The application has a `db.json` file on the backend that is used to store and retrieve notes using the `fs` module.

* The following API routes that I created:

  * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON. <br>
  ![api](https://user-images.githubusercontent.com/57735283/99102425-e907fd80-2592-11eb-9080-d02521a5a45e.gif)

  * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. <br>
  ![save](https://user-images.githubusercontent.com/57735283/99102445-edccb180-2592-11eb-80c9-a7b2cd75a3a9.gif)

  * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. I used the native JavaScript Date as a unique id, which store the exact date and time when the note was created. To delete a note, the app reads all notes from the `db.json` file, filters out the note with the given `id` property, and then rewrite the notes to the `db.json` file. <br>
  ![delete](https://user-images.githubusercontent.com/57735283/99102428-ea392a80-2592-11eb-9361-f7444dc71197.gif)

## User Story

AS A user, I want to be able to write and save notes

I WANT to be able to delete notes I've written before

SO THAT I can organize my thoughts and keep track of tasks I need to complete

## Business Context

For users that need to keep track of a lot of information, it's easy to forget or be unable to recall something important. Being able to take persistent notes allows users to have written information available when needed.

## Acceptance Criteria

Application should allow users to create and save notes.

Application should allow users to view previously saved notes.

Application should allow users to delete previously saved notes.

## Deploying the App

This is not deployed on GitHub pages. This app is deployed on Heroku.

## Credit
Trilogy Education Services for project set up

kailniris on stackoverflow with a solution on appending json files https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js
