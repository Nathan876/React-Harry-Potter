import { useState, useEffect } from 'react';
import { getCharacters } from '../services/CharacterService';
import type DataItem from '../interfaces/DataItem';

export function useDailyCharacter() {
    const [dailyCharacter, setDailyCharacter] = useState<DataItem | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDaily = async () => {
            try {
                setIsLoading(true);
                const response = await getCharacters();
                const charactersList = response.data;

                if (charactersList.length > 0) {
                    const today = new Date();
                    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
                    const dailyIndex = dateSeed % charactersList.length;
                    setDailyCharacter(charactersList[dailyIndex]);
                }
                setIsLoading(false);
            } catch (err) {
                console.error("Erreur lors de la récupération:", err);
                setError("Impossible de charger le personnage du jour.");
                setIsLoading(false);
            }
        };
        fetchDaily();
    }, []);

    return { dailyCharacter, isLoading, error };
}