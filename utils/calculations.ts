
import type { DashboardData } from '../services/data';

export const recalculateState = (currentState: DashboardData, initialState: DashboardData): DashboardData => {
    const numCols = initialState.headers.subCategories.length;
    const numParams = initialState.parameters.length;

    // 1. Update parameter scores based on new input
    // The logic assumes a proportional change from the initial state
    for (let i = 0; i < numParams; i++) {
        const initialInput = initialState.parameters[i].input;
        const currentInput = currentState.parameters[i].input;
        const ratio = initialInput > 0 ? currentInput / initialInput : 0;
        
        for (let j = 0; j < numCols; j++) {
            const initialScore = initialState.parameters[i].scores[j];
            currentState.parameters[i].scores[j] = initialScore * ratio;
        }
    }

    // 2. Recalculate footer rows (Mean, Max, Min)
    const columnSums = Array(numCols).fill(0);
    for (let j = 0; j < numCols; j++) {
        const columnValues: number[] = [];
        for (let i = 0; i < numParams; i++) {
            const value = currentState.parameters[i].scores[j];
            columnValues.push(value);
            columnSums[j] += value;
        }
        currentState.footer.mean.values[j] = columnSums[j] / numParams;
        currentState.footer.max.values[j] = Math.max(...columnValues);
        currentState.footer.min.values[j] = Math.min(...columnValues);
    }
    
    // 3. Recalculate ESG Index for each column
    const initialColumnSums = Array(numCols).fill(0);
     for (let j = 0; j < numCols; j++) {
        for (let i = 0; i < numParams; i++) {
            initialColumnSums[j] += initialState.parameters[i].scores[j];
        }
    }

    for (let j = 0; j < numCols; j++) {
        const initialSum = initialColumnSums[j];
        const currentSum = columnSums[j];
        const sumRatio = initialSum > 0 ? currentSum / initialSum : 0;
        currentState.footer.esgIndex.values[j] = initialState.footer.esgIndex.values[j] * sumRatio;
    }
    
    // 4. Recalculate Overall ESG Score (as a simple average of ESG indices)
    const esgIndexValues = currentState.footer.esgIndex.values;
    const sumOfEsgIndices = esgIndexValues.reduce((sum, current) => sum + current, 0);
    
    currentState.overallScore = esgIndexValues.length > 0 ? sumOfEsgIndices / esgIndexValues.length : 0;

    return currentState;
};