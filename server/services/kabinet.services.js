import db from '../config/db';

class KabinetService {
  static async createEvent(user) {
 
    const {
      date,
      title,
      event_type,
      location,
      organization_name,
      description,
      category,
      organizer_info,
      website,
      organizer_contact,
    } = user;

   
    
    const sql = 'INSERT INTO kabinetevents (date, title, event_type, location, organization_name, description, category, organizer_info, website, organizer_contact) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    const bindParameters = [date, title, event_type, location, organization_name, description, category, organizer_info, website, organizer_contact];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows[0];
   
  }

  static async createInterest(user) {
  
    const {
      contact,
      eventid
    } = user;

   
    
    const sql = 'INSERT INTO kabinetinterest (contact, eventid) VALUES($1, $2) RETURNING *';
    const bindParameters = [contact, eventid];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows[0];
   
  }

  static async getEvent() {
    const sql = 'SELECT * from kabinetevents';
    const client = await db.connect();
    const result = await client.query(sql);
    client.release();
    return result.rows;
  }

  static async getInterest() {
    const sql = 'SELECT * from kabinetinterest';
    const client = await db.connect();
    const result = await client.query(sql);
    client.release();
    return result.rows;
  }

  static async delEvent(user) {
    const sql = 'DELETE FROM kabinetevents WHERE id = $1';
    const bindParameters = [user.id];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
    
  }

 

}
export default KabinetService;
