
export interface DashboardData {
    headers: {
        categories: { name: string; span: number }[];
        subCategories: string[];
        weights: number[];
    };
    parameters: {
        name: string;
        scores: number[];
        input: number;
    }[];
    footer: {
        mean: { label: string; values: number[] };
        max: { label: string; values: number[] };
        min: { label: string; values: number[] };
        esgIndex: { label: string; values: number[] };
    };
    overallScore: number;
}

export const initialDashboardData: DashboardData = {
    headers: {
        categories: [
            { name: 'ENVIRONMENTAL', span: 5 },
            { name: 'SOCIAL', span: 4 },
            { name: 'GOVERNANCE', span: 3 },
        ],
        subCategories: [
            'Materials and Procurement', 'Energy', 'Water', 'Transport', 'Waste',
            'Labor Practices and Decent Work', 'Human Rights', 'Society & Customers', 'Ethical behaviour',
            'Transparency and Disclosure', 'Integration into Corporate Strategy', 'Stakeholder Engagement and Collaboration'
        ],
        weights: [0.096, 0.104, 0.083, 0.071, 0.063, 0.090, 0.100, 0.067, 0.077, 0.088, 0.100, 0.063]
    },
    parameters: [
        { name: 'Management Commitment', scores: [0.479, 0.521, 0.417, 0.354, 0.313, 0.450, 0.500, 0.333, 0.383, 0.438, 0.500, 0.313], input: 5 },
        { name: 'Employee Awareness and Training', scores: [0.383, 0.417, 0.333, 0.283, 0.250, 0.360, 0.400, 0.267, 0.307, 0.350, 0.400, 0.250], input: 4 },
        { name: 'Data Availability and Management', scores: [0.383, 0.417, 0.333, 0.283, 0.250, 0.360, 0.400, 0.267, 0.307, 0.350, 0.400, 0.250], input: 4 },
        { name: 'Technology Infrastructure', scores: [0.383, 0.417, 0.333, 0.283, 0.250, 0.360, 0.400, 0.267, 0.307, 0.350, 0.400, 0.250], input: 4 },
        { name: 'Regulatory Compliance', scores: [0.479, 0.521, 0.417, 0.354, 0.313, 0.450, 0.500, 0.333, 0.383, 0.438, 0.500, 0.313], input: 5 },
        { name: 'Supply Chain Collaboration', scores: [0.479, 0.521, 0.417, 0.354, 0.313, 0.450, 0.500, 0.333, 0.383, 0.438, 0.500, 0.313], input: 5 },
        { name: 'Pilot Programs and Demonstrations', scores: [0.192, 0.208, 0.167, 0.142, 0.125, 0.180, 0.200, 0.133, 0.153, 0.175, 0.200, 0.125], input: 2 },
        { name: 'Circular Design Integration', scores: [0.383, 0.417, 0.333, 0.283, 0.250, 0.360, 0.400, 0.267, 0.307, 0.350, 0.400, 0.250], input: 4 },
        { name: 'Risk Management and Contingency Plan', scores: [0.383, 0.417, 0.333, 0.283, 0.250, 0.360, 0.400, 0.267, 0.307, 0.350, 0.400, 0.250], input: 4 },
        { name: 'Monitoring and Evaluation Framework', scores: [0.383, 0.417, 0.333, 0.283, 0.250, 0.360, 0.400, 0.267, 0.307, 0.350, 0.400, 0.250], input: 4 },
    ],
    footer: {
        mean:     { label: 'Criteria Mean', values: [0.393, 0.427, 0.342, 0.290, 0.256, 0.369, 0.410, 0.273, 0.314, 0.359, 0.410, 0.256] },
        max:      { label: 'Max', values: [0.479, 0.521, 0.417, 0.354, 0.313, 0.450, 0.500, 0.333, 0.383, 0.438, 0.500, 0.313] },
        min:      { label: 'Min', values: [0.192, 0.208, 0.167, 0.142, 0.125, 0.180, 0.200, 0.133, 0.153, 0.175, 0.200, 0.125] },
        esgIndex: { label: 'ESG Index', values: [4.715, 5.125, 4.100, 3.485, 3.075, 4.428, 4.920, 3.280, 3.772, 4.305, 4.920, 3.075] },
    },
    overallScore: 4.101666666666667,
};