// This is a mock API service. Replace with actual API calls in production.

export interface Task {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'pending' | 'in_review' | 'completed';
}

export interface Review {
    id: string;
    taskId: string;
    rating: number;
    content: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    submitTask: async (task: Omit<Task, 'id' | 'status'>): Promise<Task> => {
        await delay(1000); // Simulate network delay
        const newTask: Task = {
            ...task,
            id: Math.random().toString(36).substr(2, 9),
            status: 'pending'
        };
        console.log('Task submitted:', newTask);
        return newTask;
    },

    submitReview: async (review: Omit<Review, 'id'>): Promise<Review> => {
        await delay(1000); // Simulate network delay
        const newReview: Review = {
            ...review,
            id: Math.random().toString(36).substr(2, 9)
        };
        console.log('Review submitted:', newReview);
        return newReview;
    },

    getTasksForReview: async (): Promise<Task[]> => {
        await delay(1000); // Simulate network delay
        return [
            { id: '1', title: 'Website Development', description: 'Develop a responsive website', category: 'Development', status: 'in_review' },
            { id: '2', title: 'Logo Design', description: 'Create a modern logo', category: 'Design', status: 'in_review' },
        ];
    }
};

