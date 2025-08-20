# CineWorld

## Introduction
**CineWorld** is a cinema ticket booking web application where users can sign up, log in, browse available movies, view details (poster, rating, description), and book tickets for their preferred showtime and seats. Users can also manage their bookings (update or delete).  

---

## Use the App
Use the app:  

---

## Contents
- [Introduction] 
- Project Features  
- Technologies Used  
- Attributions  
- Core Logic  
- Future Enhancements  
- Conclusion  

---

## Project Features
- **User Authentication** — secure sign up & sign in with token-based authentication.  
- **Movie Catalog** — browse a collection of movies with poster, description, and rating.  
- **Ticket Booking** — select a movie, choose date, time, and seats, then confirm booking.  
- **Booking Management** — view all your bookings, update details, or delete them.  

---

## Technologies Used
- React  
- Node.js & Express  
- MongoDB  

---

## Attributions
- React Spinners  
- clsx  

---

## Core Logic
- **Authentication & Authorization**  
  Users sign up and log in via a secure form. JWT tokens are stored in local storage, and routes are protected so only authenticated users can book tickets or view their bookings.  

- **Movie Listing**  
  Movies are stored in the database and fetched via an API. Each movie includes a poster, rating, and description.  

- **Booking Management**  
  Users can create bookings with movie, date, time, and seats. Bookings are user-specific, and only the owner can edit or delete them.  

---

## Future Enhancements
- Add a **ticket price calculator** to display the total cost based on seat selection.  
- **Snacks & Combos** — allow users to order snacks during ticket booking.  
- **Email / SMS Notifications** — send booking confirmations and reminders.  

---

## Conclusion
CineWorld delivers a full-stack cinema booking system with authentication, CRUD operations, and a themed UI. It provides a real-world ticketing solution and can be extended with features such as payments, notifications, and mobile support.  

