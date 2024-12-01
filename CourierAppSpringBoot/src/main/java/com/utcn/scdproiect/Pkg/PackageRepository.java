package com.utcn.scdproiect.Pkg;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PackageRepository extends JpaRepository<Package, Integer> {

    public List<Package> findPackagesByStatus(PackageStatus status);

    public List<Package> findPackagesByCourierId(Integer courierId);

    @Query("SELECT p FROM Package p WHERE p.courier.id = :courierId AND p.status = com.utcn.scdproiect.Pkg.PackageStatus.DELIVERED")
    List<Package> findDeliveredPackagesByCourierId(@Param("courierId") Integer courierId);



}
