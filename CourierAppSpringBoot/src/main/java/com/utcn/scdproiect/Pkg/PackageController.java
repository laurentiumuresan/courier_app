package com.utcn.scdproiect.Pkg;


import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/package")
@CrossOrigin
public class PackageController {

    @Autowired
    private PackageService packageService;

    @PostMapping("/add-package")
    public Package createPackage(@RequestBody Package pkg) {
        return packageService.createPackage(pkg);
    }

    @GetMapping
    public List<Package> getAllPackages() {
        return packageService.getAllPackages();
    }

    @GetMapping("/{id}")
    public Optional<Package> getPackageById(@PathVariable Integer id) {
        return packageService.getPackageById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePackage(@PathVariable Integer id) {
        packageService.deletePackage(id);
    }

    @GetMapping("/status/{status}")
    public List<Package> findPackageByStatus(@PathVariable PackageStatus status) {
        return packageService.findPackagesByStatus(status);
    }

    @GetMapping("/courier/{courierId}")
    public List<Package> findPackageByCourier(@PathVariable Integer courierId) {
        return packageService.findPackagesByCourier(courierId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Package> updatePackage(@PathVariable Integer id, @RequestBody Package updatedPackage) {
        try {
            Package updatedPkg = packageService.updatePackage(id, updatedPackage);
            return new ResponseEntity<>(updatedPkg, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
