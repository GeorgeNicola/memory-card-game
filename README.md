Referinta
https://www.solitairebliss.com/memory

1. Create Design - Pages / Components - Sa respecte toate cerintele
2. Design BE - Users / Scoreboard

**_ Pagini _**

HP - pagina joc

- top: selectare tip joc: max 3 dificultati 4x4, 5x5, 6x6
- joc cu carti ( poze carti joc )
- Buton Start => timer
- stare globala: ista cu cartile intoarse si neintoarse

Scoreboard ( pagina listare date )

- listare cei mai buni jucatori general ( filtre: dificultate joc, sortare: cel mai scurt timp / cel mai lung )

Profile Page ( pagina pt detalii / ruta dinamica => /user/usr-124124 )

- tab profil ( nested route ) /user/usr-124124/profile
  - display: name, email
- tab scoruri ( nested route ) /user/usr-124124/scoreboard - save as on scoreboard page

Login / Register Pages

- save in localstorage token for user
- Login: email, password
- Register: name, email, password
- stare globala: salvare user

Just use custom CSS, no external library
I need all pages to have a dark design with this accent color #39ff14
I need a layout component that has a header which has a menu for all pages beside Login / Register in the middle and a logo on the left side

**_ Backend _**
Node + PostgreSQL

/login

- input: email, passw
- output: user

/register

- input: name, email, passw
- output: user

/score/add

/scores

- filtre: userId, dificultate
- sort: scor

Tabel Users

- UserId
- Name
- Email
- Password

Tabel Score

- ScoreId
- UserId
- Score / timp
- Dificulty

**_ Docker _**

- docker compose up -d

**_ Prisma migration _**

- npx prisma migrate dev --name init2
- npx prisma generate

**_ TO DO _**

1. Create reusable components: ScoresTable, Card, CardList
2. Add filters + sort to getScores
3. Refactor Main Page
