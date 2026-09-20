--1. querie que lista usuarios
SELECT * FROM users ORDER BY created_at DESC;


--2. BONUS: quantidade de usuarios criados por mes
SELECT
    DATE_FORMAT(created_at, '%Y-%m') AS month,
    COUNT(*) AS total_users
FROM users
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month;