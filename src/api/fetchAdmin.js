import { supabase } from './client';

async function fetchAdminUser() {
    try {
        const { data, error } = await supabase
            .from('administrator')
            .select('*')
            .eq('role', 'admin');

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching admin user:', error);
        return null;
    }
}

export default fetchAdminUser;