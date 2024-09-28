# Questionnaire API Documentation

This API allows the creation and management of questionnaires and questions. Below are the available endpoints, their purposes, and expected parameters.

## Base URL

The base URL for all API requests is `/api`. You can interact with the following endpoints:

- `/api/questionnaires`
- `/api/questions`

---

## Table of Contents

1. [Questionnaire Endpoints](#questionnaire-endpoints)
   - [Create Questionnaire](#create-questionnaire)
   - [Get Questionnaire](#get-questionnaire)
   - [Take Questionnaire](#take-questionnaire)
2. [Question Endpoints](#question-endpoints)
   - [Bulk Create Questions](#bulk-create-questions)
   - [Get Questions](#get-questions)

---

## Questionnaire Endpoints

### 1. Create Questionnaire

**Endpoint:** `POST /api/questionnaires`

Create a new questionnaire with a set of questions.

#### Request Body:

```json
{
  "questionnaire": {
    "title": "string",
    "description": "string (optional)",
    "questions": ["array of ObjectId(s)"]
  }
}
```

- **`title`**: A string representing the title of the questionnaire (required).
- **`description`**: An optional string providing a description of the questionnaire.
- **`questions`**: An array of question ObjectIds, with a minimum of one question.

#### Example Request:

```json
POST /api/questionnaires
{
"questionnaire": {
"title": "General Knowledge Quiz",
"description": "Test your general knowledge.",
"questions": ["615f11ff16e63d6bca0b4a28", "615f120616e63d6bca0b4a29"]
}
}
```

---

### 2. Get Questionnaire

**Endpoint:** `GET /api/questionnaires/:id`

Fetch a questionnaire by its ID.

#### URL Parameter:

- **`id`**: ObjectId of the questionnaire (required).

#### Example Request:

```bash
GET /api/questionnaires/615f11ff16e63d6bca0b4a27
```

---

### 3. Take Questionnaire

**Endpoint:** `POST /api/questionnaires/:id/take`

Submit answers for a given questionnaire.

#### URL Parameter:

- **`id`**: ObjectId of the questionnaire being taken (required).

#### Request Body:

```json
{
  "answers": [
    {
      "questionId": "ObjectId",
      "answerId": "ObjectId"
    }
  ]
}
```

- **`answers`**: An array of question and answer pairs.
  - **`questionId`**: The ID of the question being answered.
  - **`answerId`**: The ID of the selected answer.

#### Example Request:

```json
POST /api/questionnaires/615f11ff16e63d6bca0b4a27/take
{
"answers": [
{
"questionId": "615f11ff16e63d6bca0b4a28",
"answerId": "615f12ab16e63d6bca0b4a2a"
}
]
}
```

---

## Question Endpoints

### 1. Bulk Create Questions

**Endpoint:** `POST /api/questions/bulk-create`

Create multiple questions in one request.

#### Request Body:

```json
{
  "questions": [
    {
      "prompt": "string",
      "answers": [
        {
          "answerText": "string",
          "isCorrect": "boolean",
          "weight": "enum ['1', '2', '3']"
        }
      ]
    }
  ]
}
```

- **`questions`**: An array of questions (minimum 2).
  - **`prompt`**: A string representing the question prompt.
  - **`answers`**: An array of answers (minimum 1). One answer must be marked as correct.
    - **`answerText`**: The text of the answer.
    - **`isCorrect`**: A boolean indicating if the answer is correct.
    - **`weight`**: A number representing the weight of the answer (1, 2, or 3).

#### Example Request:

```json
POST /api/questions/bulk-create
{
"questions": [
{
"prompt": "What is the capital of France?",
"answers": [
{ "answerText": "Paris", "isCorrect": true, "weight": 1 },
{ "answerText": "London", "isCorrect": false, "weight": 2 }
]
}
]
}
```

---

### 2. Get Questions

**Endpoint:** `GET /api/questions`

Retrieve a list of questions with optional filters, pagination, and limits.

#### Query Parameters:

- **`filter[ids]`**: An optional array of question ObjectIds to filter by.
- **`limit`**: A number to limit the number of questions returned (default 10).
- **`offset`**: A number to offset the starting point for fetching questions (default 0).

#### Example Request:

```bash
GET /api/questions?filter[ids]=615f11ff16e63d6bca0b4a28&limit=5&offset=0
```

---

## Error Handling

All endpoints follow consistent error handling. If validation fails, the API responds with a 400 status code and details about the validation error.

#### Example Error Response:

```json
{
  "error": "Invalid data",
  "details": [
    {
      "message": "Invalid ObjectId",
      "path": ["params", "id"]
    }
  ]
}
```
