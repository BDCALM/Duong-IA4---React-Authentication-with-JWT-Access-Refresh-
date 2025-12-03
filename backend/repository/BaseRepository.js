// backend/repositories/BaseRepository.js
import { supabase } from "../config/database.js"; 

/**
 * BaseRepository - Lớp cha phụ trách giao tiếp Database
 * -----------------------------------------------------
 */
export class BaseRepository {
  constructor(tableName, primaryKey = "id") {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }

  async create(data) {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert([data])
      .select();

    if (error) throw new Error(`[${this.tableName}] Create failed: ${error.message}`);
    return result?.[0] || null;
  }

  async getById(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq(this.primaryKey, id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(`[${this.tableName}] GetById failed: ${error.message}`);
    }
    return data || null;
  }

  async update(id, updates) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates)
      .eq(this.primaryKey, id)
      .select();

    if (error) throw new Error(`[${this.tableName}] Update failed: ${error.message}`);
    return data?.[0] || null;
  }

  async delete(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .delete()
      .eq(this.primaryKey, id)
      .select();

    if (error) throw new Error(`[${this.tableName}] Delete failed: ${error.message}`);
    return data?.[0] || null;
  }

  async getAll(filters = {}) {
    let query = supabase.from(this.tableName).select("*");

    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }
    const { data, error } = await query;
    if (error) throw new Error(`[${this.tableName}] GetAll failed: ${error.message}`);
    return data || [];
  }
}