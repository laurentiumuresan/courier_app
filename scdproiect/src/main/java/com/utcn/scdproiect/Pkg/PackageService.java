package com.utcn.scdproiect.Pkg;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageService {

    @Autowired
    private PackageRepository packageRepository;

    @Transactional
    public Package createPackage(Package pkg) {
        return packageRepository.save(pkg);
    }

    // READ all packages
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    // READ a single package by ID
    public Optional<Package> getPackageById(Integer id) {
        return packageRepository.findById(id);
    }

    // UPDATE an existing package
    @Transactional
    public Package updatePackage(Integer id, Package newPackageData) {
        return packageRepository.findById(id)
                .map(pkg -> {
                    pkg.setCourier(newPackageData.getCourier());                // Update courier
                    pkg.setDeliveryAddress(newPackageData.getDeliveryAddress()); // Update delivery address
                    pkg.setPayOnDelivery(newPackageData.isPayOnDelivery());      // Update pay on delivery status
                    pkg.setStatus(newPackageData.getStatus());                   // Update package status
                    return packageRepository.save(pkg);
                })
                .orElseThrow(() -> new IllegalArgumentException("Package not found with id: " + id));
    }

    // DELETE a package by ID
    @Transactional
    public void deletePackage(Integer id) {
        packageRepository.deleteById(id);
    }

    // Find packages by delivery status
   public List<Package> findPackagesByStatus(PackageStatus status) {
        return packageRepository.findPackagesByStatus(status);
    }

    // Find packages by courier ID
    public List<Package> findPackagesByCourier(Integer courierId) {
        return packageRepository.findPackagesByCourier(courierId);
    }
}
