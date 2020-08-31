/**
 * 
 */
package org.sonarsource.plugins.jjoules.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

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
	
	public static final String CREATE_TESTS_TABLE_QUERY = "CREATE TABLE IF NOT EXISTS tests(id SERIAL NOT NULL ,test varchar(225) NOT NULL ,e_cpu INTEGER,"
			+ "e_dram INTEGER,e_device INTEGER,duration INTEGER, analysed_at BIGINT NOT NULL, project_key  varchar(225) NOT NULL, PRIMARY KEY(id,analysed_at), UNIQUE(test,analysed_at))";
	public static final String CREATE_TESTS_CALLGRAPH_TABLE_QUERY = "CREATE TABLE IF NOT EXISTS callgraph(source varchar(225) NOT NULL,target varchar(225) NOT NULL,UNIQUE(source,target))";
	
	private static final String INSERT_QUERY = "INSERT INTO tests (test,e_cpu,e_dram,e_device,duration,analysed_at,project_key) VALUES (?,?,?,?,?,?,?)";
	private static final String INSERT_QUERY1 = "INSERT INTO tests_bis1 (test,e_cpu,e_dram,e_device,duration,analysed_at,project_key) VALUES (?,?,?,?,?,?,?)";
	private static final String INSERT_CALLGRAPH_QUERY = "INSERT INTO callgraph (source,target) VALUES (?,?)";
	
	
	
	private static Connection CONNECTION = init();
	
	public static Connection init() {
		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e1) {
			e1.printStackTrace();
		}
		try {
			return DriverManager.getConnection(URL, USER, PASSWORD);
		} catch (SQLException e) {	
			e.printStackTrace();
		}
		return null;
	}
	
	public static void createTable(String request) {
		try {
			
			PreparedStatement pst = CONNECTION.prepareStatement(request);
			pst.execute();	
			pst.close();	
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
	}
	
	public static String getLastSnapshot() {
		PreparedStatement pst;
		try {
			pst = CONNECTION.prepareStatement("SELECT created_at FROM snapshots ORDER BY created_at DESC");
			ResultSet rs = pst.executeQuery();
			rs.next();
			String res = rs.getString(1);
			pst.close();
			return res;
		} catch (SQLException e) {
			return null;
		}
		
		
	}
	
	public static boolean insertLineInTable(String[] values) {
		
		PreparedStatement pst;
		boolean res = false;
		try {
			
			pst = CONNECTION.prepareStatement(INSERT_QUERY);
			pst.setString(1, values[0]);
			pst.setLong(2, Long.parseLong(values[1]));
			pst.setLong(3, Long.parseLong(values[2]));
			pst.setLong(4, Long.parseLong(values[3]));
			pst.setLong(5, Integer.parseInt(values[4]));
			pst.setLong(6,Long.parseLong(values[5]));
			pst.setString(7,values[6]);
			
			res = pst.executeUpdate() >= 1 ? true : false;
			pst.close();
		} catch (SQLException e) {
			e.printStackTrace();
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
			pst.setString(2, values[1].substring(1, values[1].length()-1));
			
			res = pst.executeUpdate() >= 1 ? true : false;
			pst.close();
		} catch (SQLException e) {
			return false;
		}
		
		return res;
	}
	
}
