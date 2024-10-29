package com.utcn.scdproiect.Pkg;


import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public Package createPackage(@RequestBody Package pkg) {
        return packageService.createPackage(pkg);
    }

    @GetMapping
    public List<Package> getAllPackages() {
        return packageService.getAllPackages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Package> getPackageById(@PathVariable Integer id) {
        Optional<Package> pkg = packageService.getPackageById(id);
        return pkg.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE an existing package
    @PutMapping("/{id}")
    public ResponseEntity<Package> updatePackage(@PathVariable Integer id, @RequestBody Package newPackageData) {
        try {
            Package updatedPackage = packageService.updatePackage(id, newPackageData);
            return ResponseEntity.ok(updatedPackage);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE a package by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Integer id) {
        Optional<Package> pkg = packageService.getPackageById(id);
        if (pkg.isPresent()) {
            packageService.deletePackage(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status/{status}")
    public List<Package> findPackageByStatus(@PathVariable PackageStatus status) {
        return packageService.findPackagesByStatus(status);
    }

    @GetMapping("/courier/{courierId}")
    public List<Package> findPackageByCourier(@PathVariable Integer courierId) {
        return packageService.findPackagesByCourier(courierId);
    }
}
