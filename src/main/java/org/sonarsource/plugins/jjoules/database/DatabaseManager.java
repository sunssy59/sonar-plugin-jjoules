/**
 * 
 */
package org.sonarsource.plugins.jjoules.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.sonar.api.utils.log.Logger;
import org.sonar.api.utils.log.Loggers;

/**
 * @author spirals
 *
 */
public class DatabaseManager {
	
	private static final Logger LOGGER = Loggers.get(DatabaseManager.class);
	
	public static final String URL = "jdbc:postgresql://localhost:54321/sonar";
	public static final String USER = "sonar";
	public static final String PASSWORD = "sonar";
	
	private static final String CREATE_TESTS_TABLE_QUERY = "CREATE TABLE IF NOT EXISTS tests(id SERIAL NOT NULL ,test varchar(225) NOT NULL ,e_cpu INTEGER,e_dram INTEGER,e_device INTEGER,duration INTEGER, analysed_at varchar(225) NOT NULL, PRIMARY KEY(id,analysed_at), UNIQUE(test,analysed_at)) ";
	private static final String CREATE_TESTS_CALLGRAPH_TABLE_QUERY = "CREATE TABLE IF NOT EXISTS callgraph(source varchar(225) NOT NULL,target varchar(225) NOT NULL,UNIQUE(source,target))";
	
	private static final String INSERT_QUERY = "INSERT INTO tests (test,e_cpu,e_dram,e_device,duration,analysed_at) VALUES (?,?,?,?,?,?)";
	private static final String INSERT_CALLGRAPH_QUERY = "INSERT INTO callgraph (source,target) VALUES (?,?)";
	
//	select (component_uuid,status,created_at,updated_at) from ce_activity;
	
	
	private static Connection CONNECTION = init();
	
	public static Connection init() {
		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			return DriverManager.getConnection(URL, USER, PASSWORD);
		} catch (SQLException e) {	
			e.printStackTrace();
		}
		return null;	
	}
	
	public static void createTable() {
		try {
			
			PreparedStatement pst = CONNECTION.prepareStatement(CREATE_TESTS_TABLE_QUERY);
			pst.execute();	
			//pst.executeUpdate();
			pst.close();
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
	}
	
	public static boolean insertLineInTable(String[] values) {
		
		PreparedStatement pst,pst1;
		boolean res = false;
		try {
			
			pst1 = CONNECTION.prepareStatement("select created_at from snapshots ORDER BY created_at DESC");
			ResultSet rs = pst1.executeQuery();
			rs.next();
			
			pst = CONNECTION.prepareStatement(INSERT_QUERY);
			pst.setString(1, values[0]);
			pst.setLong(2, Long.parseLong(values[1]));
			pst.setLong(3, Long.parseLong(values[2]));
			pst.setLong(4, Long.parseLong(values[3]));
			pst.setLong(5, Integer.parseInt(values[4]));
			pst.setString(6,rs.getString(1));
			
			res = pst.executeUpdate() >= 1 ? true : false;
			pst.close();
			pst1.close();
		} catch (SQLException e) {
			//e.printStackTrace();
			return false;
		}
		return res; 
	}
	
	public static boolean insertLineInCallgraphTable(String[] values) {
		PreparedStatement pst;
		
		boolean res = false;
		try {
			pst = CONNECTION.prepareStatement(INSERT_CALLGRAPH_QUERY);
			pst.setString(1, values[0]);
			pst.setString(2, values[1]);
			
			res = pst.executeUpdate() >= 1 ? true : false;
			pst.close();
		} catch (SQLException e) {
			return false;
		}
		
		return res;
	}
	
	public static void listeTestsTable(String query) {
		try {
			PreparedStatement pst = CONNECTION.prepareStatement(query);
			
			ResultSet res = pst.executeQuery();

			while(res.next()) {
								
				System.out.print(res.getString(1));
				System.out.print(" , "+res.getString(2));
				System.out.print(" , "+res.getLong(3));
				System.out.print(" , "+res.getLong(4));
				System.out.print(" , "+res.getLong(5));
				System.out.print(" , "+res.getInt(6));
				System.out.println(" , "+res.getString(7));
				
//				System.out.print(res.getString(1));
//				System.out.print(" , "+res.getString(2));
//				System.out.print(" , "+res.getString(3));
//				System.out.print(" , "+res.getString(4));
//				System.out.print(" , "+res.getString(5));
//				System.out.print(" , "+res.getString(6));
//				System.out.print(" , "+res.getString(7));
//				System.out.print(" , "+res.getString(8));
//				System.out.print(" , "+res.getString(9));
//				System.out.println(" , "+res.getString(10));

			}
			
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public static void main(String[] args){
//		createTable();
		String[] values = {"testTwo","2","10","22"};
		insertLineInTable(values);
		// select component_uuid,created_at,islast,period1_mode from snapshots ORDER BY created_at ASC;
		String qr = "SELECT * from tests";
		String qr1 = "select * from snapshots";
		String qr2 = "select component_uuid,status,created_at,updated_at from ce_activity";
		listeTestsTable(qr);
		
	}
}
