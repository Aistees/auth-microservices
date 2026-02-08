# Film Microservice - Initial Schema

## Schema Changes

- Created `Film` table with the following columns:
  - id (String, primary key with cuid default)
  - title (String, required)
  - description (String, optional)
  - director (String, required)
  - genre (String)
  - duration (Int)
  - releaseDate (DateTime)
  - rating (Float, default 0)
  - createdAt (DateTime, default now())
  - updatedAt (DateTime, auto-updated)
