package com.utcn.scdproiect.Pkg;

import com.utcn.scdproiect.Courier.Courier;
import com.utcn.scdproiect.Courier.CourierRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageService {

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private CourierRepository courierRepository;

    @Transactional
    public Package createPackage(Package pkg) {
        // Check if the Courier with the provided ID exists
        if (pkg.getCourier() != null && pkg.getCourier().getId() != null) {
            // Fetch the existing Courier
            Courier existingCourier = courierRepository.findById(pkg.getCourier().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Courier not found"));
            // Set the existing Courier to the Package
            pkg.setCourier(existingCourier);
        }

        // Now save the Package with the associated Courier
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
        return packageRepository.findPackagesByCourierId(courierId);
    }
    public Package updatePackage(Integer id, Package updatedPackage) {
        // Find the existing package
        Package existingPackage = packageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Package not found with id: " + id));

        // Check if the updatedPackage has a courier and assign if it does
        if (updatedPackage.getCourier() != null && updatedPackage.getCourier().getId() != null) {
            Integer courierId = updatedPackage.getCourier().getId();
            Optional<Courier> newCourier = courierRepository.findById(courierId);

            if (newCourier.isPresent()) {
                existingPackage.setCourier(newCourier.get()); // Assign the new courier
                System.out.println("Courier with id " + courierId + " assigned successfully.");
            } else {
                System.out.println("Courier with id " + courierId + " not found.");
                throw new EntityNotFoundException("Courier not found with id: " + courierId);
            }
        } else {
            existingPackage.setCourier(null); // Unassign courier if none is provided in update
            System.out.println("Courier unassigned.");
        }

        // Update other fields if they are provided
        if (updatedPackage.getDeliveryAddress() != null) {
            existingPackage.setDeliveryAddress(updatedPackage.getDeliveryAddress());
        }

        existingPackage.setPayOnDelivery(updatedPackage.isPayOnDelivery());

        if (updatedPackage.getStatus() != null) {
            existingPackage.setStatus(updatedPackage.getStatus());
        }

        existingPackage.setCreatedOn(updatedPackage.getCreatedOn());

        // Save and return the updated package
        return packageRepository.save(existingPackage);
    }


}
