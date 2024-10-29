package com.utcn.scdproiect.Pkg;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PackageRepository extends JpaRepository<Package, Integer> {

    public List<Package> findPackagesByStatus(PackageStatus status);

    public List<Package> findPackagesByCourier(Integer courierId);

}
