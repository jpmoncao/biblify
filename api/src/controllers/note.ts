import IDevotionalNotation from "../interfaces/devotional-notation";
import DevotionalNotations from "../models/devotional-notation";

const updateDevotionalNotation = async (userId: string, date: Date, content: string): Promise<void> => {
    await DevotionalNotations.updateOne({ userId, date }, { content }, { upsert: true });
}

const listDevotionalNotation = async (userId: string, date: Date): Promise<IDevotionalNotation | null> => {
    const devotionalNotation = await DevotionalNotations.findOne({ userId, date });

    if (!devotionalNotation) return null;

    return devotionalNotation;
}

const listDevotionalsNotationsOfTheMonth = async (userId: string, year: number, month: number): Promise<number[]> => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1); // primeiro dia do mês seguinte

    // Consulta todos os devocionais do usuário dentro do intervalo de datas
    const devotionals: IDevotionalNotation[] = await DevotionalNotations.find({
        userId,
        date: {
            $gte: startDate,
            $lt: endDate,
        },
    });

    // Mapeia cada devocional para o dia do mês (valor numérico)
    const days = devotionals.map(devotional => {
        return new Date(devotional.date).getDate() + 1;
    });

    return days;
}

export { updateDevotionalNotation, listDevotionalNotation, listDevotionalsNotationsOfTheMonth };
