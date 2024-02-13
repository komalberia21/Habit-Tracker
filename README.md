
# Habit Tracker App 
This is a habit tracker web application designed to help users build and maintain positive habits. The app is built with HTML, CSS, Bootstrap, and Node.js, providing a seamless and intuitive experience for users to track their daily activities.

## Features


- Add and Customize Habits: Easily add and customize habits with personalized details, making it tailored to your unique lifestyle.

- Streak Tracking: Visualize your progress with streak tracking, showcasing the number of consecutive days you've successfully completed each habit.

- Motivational Messages: Add inspirational messages to stay motivated and committed to your goals.

- Completed Habit Page: View all your completed habits in one dedicated page, celebrating your achievements.

- Edit and Delete Habits: Make adjustments to your habits at any time with the ability to edit or delete them.

- Notifications: Receive notifications for every action, keeping you engaged and informed.
## Tech Stack

- HTML, CSS, JavaScript: The app is built using these web technologies, ensuring a responsive and user-friendly experience.
- Node.js for effective backend
- MongoDb for storing of data

## Installation

- Clone the Repository:
- Open the index1.html file in your web browser to use the Alarm Clock App.
- run npm install to install all the dependencied
- run node server.js for starting backend
    
## Feedback

Feedback
I would love to hear your feedback! If you encounter issues or have suggestions for improvements, please create an issue in the repository.

Happy Tracking! 🌅✨

## API Reference

#### register

```http
  Post /api/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**  |
| `email` | `string` | **Required**  |
| `password` | `string` | **Required**  |

#### login

```http
  Post /api/user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**  |
| `password` | `string` | **Required**  |

#### Add habit

```http
  Post /api/habits/add/${userId}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `ObjectId` | **Required**. Id of user whose habit is |

#### Get all habit
```http
  Get /api/habits/getallhabits
  ````
#### Get all habits of user

```http

  Get /api/habits/getallhabits/${userId}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `ObjectId` | **Required**. Id of user whose habit is |

#### delete habit
```http

  DELETE /api/habits/delete/&{habitId}/${userId}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `ObjectId` | **Required**. Id of user whose habit is to be deleted |
| `habitId`      | `ObjectId` | **Required**. Id of habit to be deleted |

#### completedHabit page
```http
 GET /api/habits/completedHabit/${habitId}/${userId}

```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `ObjectId` | **Required**. Id of user whose habit is |
| `habitId`      | `ObjectId` | **Required**. Id of habit to be deleted |

#### edit habit

```http

  Put /api/habits/edit/${habitId}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `habitId`      | `ObjectId` | **Required**. Id of habit to be deleted |

#### toggle day of habit

```http

  Put /api/habits/togglecompleted/${habitId}/${dayId}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `habitId`      | `ObjectId` | **Required**. Id of habit to be toggled |
| `dayId`      | `ObjectId` | **Required**. Id of day to be toggled inside habit |





