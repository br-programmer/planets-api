# 🌍 Planets API

Public API to retrieve data about the planets of the Solar System. Supports **English** and **Spanish** via request headers.

---

## 🚀 Endpoints

### 1. Get All Planets
`GET /planets`

Returns a list of all planets with basic data for the home view.

#### Sample Response:
```json
[
  {
    "id": "mars",
    "name": "Mars",
    "highlight": "Neighbor of Earth",
    "image": "https://.../mars.jpg"
  }
]
```

---

### 2. Get Planet Details
`GET /planets/:id`

Returns detailed information for a planet by its ID.

#### Sample Response:
```json
{
  "id": "mars",
  "name": "Mars",
  "highlight": "Neighbor of Earth",
  "image": "...",
  "orbital_distance_km": 227943824,
  "equatorial_radius_km": 3389,
  "...": "...",
  "atmosphere_composition": "Carbon Dioxide, Nitrogen, Argon",
  "description": "Mars, known as the Red Planet..."
}
```

---

## 🌐 Language Support

Send the header `x-lang` with values:
- `en` → English
- `es` → Spanish

#### Defaults:
- If omitted: defaults to `en`
- If invalid: returns `400 Bad Request` with error message.

---

## ⚠️ Error Handling

- `404 Not Found` → Planet does not exist
- `400 Bad Request` → Invalid `x-lang` value (must be `en` or `es`)

---

## 🛠 Usage Example (cURL)

### Get all planets in Spanish:
```bash
curl -H "x-lang: es" http://localhost:3000/planets
```

### Get Mars details:
```bash
curl -H "x-lang: en" http://localhost:3000/planets/mars
```

---

## 📌 Available Planet IDs

| ID        | Planet Name |
|-----------|-------------|
| mercury   | Mercury     |
| venus     | Venus       |
| earth     | Earth       |
| mars      | Mars        |
| jupiter   | Jupiter     |
| saturn    | Saturn      |
| uranus    | Uranus      |
| neptune   | Neptune     |
