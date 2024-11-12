package com.utcn.scdproiect.Courier;

import com.utcn.scdproiect.Pkg.PackageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourierRepository extends JpaRepository<Courier, Integer> {


    @Query("SELECT c FROM Courier c LEFT JOIN Package p ON p.courier = c WHERE p.status != com.utcn.scdproiect.Pkg.PackageStatus.PENDING OR p IS NULL")
    List<Courier> findAllWithoutPendingPackages();

    @Query("SELECT c.managerId AS manager, COUNT(p) AS deliveredCount FROM Package p JOIN p.courier c WHERE p.status = com.utcn.scdproiect.Pkg.PackageStatus.DELIVERED  GROUP BY c.managerId")
    List<Object[]> findAllManagersAndDeliveredCount();

    @Query("SELECT c " +
            "FROM Courier c " +
            "JOIN c.subordinates s " +  // Check if a courier has subordinates (is a manager)
            "JOIN Package p ON p.courier.id = c.id " +
            "WHERE p.status = com.utcn.scdproiect.Pkg.PackageStatus.DELIVERED " +
            "GROUP BY c.id")
    List<Courier> getAllManagersWithDeliveredPackages();

    @Query("SELECT c, COUNT(p.id) AS deliveredCount " +
            "FROM Courier c LEFT JOIN Package p ON p.courier.id = c.id " +
            "WHERE c.managerId = :managerId AND (p.status = com.utcn.scdproiect.Pkg.PackageStatus.DELIVERED OR p IS NULL) " +
            "GROUP BY c.id")
    List<Object[]> countDeliveredPackagesForSubordinates(@Param("managerId") Integer managerId);

    Courier findByEmail(String email);

}
