<script setup>
    // const { data: list } = await useFetch('/api/scores', {
    //     query: { userId: 1, dificulty: 2 }
    // })
    
    const { data: list } = await useFetch('/api/scores')

    const saveScore = async () => {
    try {
        const response = await $fetch('/api/score/add', {
        method: 'POST',
        body: {
            userId: 1,      // ID-ul utilizatorului logat
            timp: 131,      // Timpul în secunde
            dificulty: 1    // Nivelul de dificultate
        }
        })
        
        console.log('Scor salvat cu succes:', response)
        alert('Scor salvat!')
    } catch (err) {
        console.error('Eroare la salvarea scorului:', err)
    }
    }
</script>

<template>
    Scoreboard Page

    <button @click="saveScore">Salvează Scorul</button>

    <pre>{{ list }}</pre>
</template>
