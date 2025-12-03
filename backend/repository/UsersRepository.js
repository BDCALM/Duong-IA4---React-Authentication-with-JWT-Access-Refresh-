// backend/repositories/CategoryRepository.js
import { BaseRepository } from "./BaseRepository.js";
import { supabase } from "../config/database.js";

class UserRepository extends BaseRepository {
  constructor() {
    // Mapping đúng với schema: [id, email, password_hash, created_at]
    super("users", "id"); 
  }
  /**
   * @param {string} email - Email cần tìm
   */
  async findByEmail(email) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .ilike('email', `%${email}%`);

    if (error) throw new Error(`FindByEmail failed: ${error.message}`);
    return data || [];
  }
}
export default new UserRepository();