package com.utcn.scdproiect.Courier;
import com.utcn.scdproiect.Pkg.Package;
import com.utcn.scdproiect.Pkg.PackageRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class CourierService {

    @Autowired
    private CourierRepository courierRepository;
    @Autowired
    private PackageRepository packageRepository;


    public List<Courier> getAllCouriers() {
        return courierRepository.findAll();
    }

    public List<Courier> getAllWithoutPendingPackages() {
        return courierRepository.findAllWithoutPendingPackages();
    }

    public List<Object[]> getAllManagersAndDeliveredCount() {
        return courierRepository.findAllManagersAndDeliveredCount();
    }

    public Courier createCourier(Courier courier) {
        return courierRepository.save(courier);
    }

    public void deleteCourier(Integer id) {
        courierRepository.deleteById(id);
    }

    public Courier getCourierById(Integer id) {
        return courierRepository.findById(id).orElse(null);
    }

    public List<Courier> getAllManagersWithDeliveredPackages() {
        return courierRepository.getAllManagersWithDeliveredPackages();
    }

    public Map<String, Object> getManagerWithDeliveredCount(Integer managerId) {
        Long deliveredCount = 0L;

        // Get the manager's information
        Courier manager = courierRepository.findById(managerId).orElse(null);
        if (manager != null) {
            // Count delivered packages for the manager
            List<com.utcn.scdproiect.Pkg.Package> managerPackages = packageRepository.findDeliveredPackagesByCourierId(manager.getId());
            deliveredCount += managerPackages.size();

            // Retrieve the manager's subordinates without mapping to DTO
            List<Courier> subordinates = manager.getSubordinates();

            // Count delivered packages for each direct subordinate
            for (Courier subordinate : subordinates) {
                List<Package> subordinatePackages = packageRepository.findDeliveredPackagesByCourierId(subordinate.getId());
                deliveredCount += subordinatePackages.size();
            }

            // Create response map with `Courier` entities directly
            Map<String, Object> response = new HashMap<>();
            response.put("managerId", manager.getId());
            response.put("managerName", manager.getName());
            response.put("deliveredCount", deliveredCount);
            response.put("subordinates", subordinates); // No DTO mapping, just the list of `Courier` entities

            return response;
        }

        return new HashMap<>();
    }


    public Courier updateCourier(Integer id, Courier updatedCourier) {
        Courier existingCourier = courierRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Courier not found with id: " + id));

        // Update fields only if they are not null
        if (updatedCourier.getName() != null) {
            existingCourier.setName(updatedCourier.getName());
        }
        if (updatedCourier.getEmail() != null) {
            existingCourier.setEmail(updatedCourier.getEmail());
        }
        if (updatedCourier.getManagerId() != null) {
            existingCourier.setManagerId(updatedCourier.getManagerId());
        }
        return courierRepository.save(existingCourier);
    }

/*
    public boolean login(CourierLoginDTO credentials)
    {
        Courier courier = courierRepository.findByEmail(credentials.getEmail());
        if(courier != null) {
            if(courier.getPassword().equals(credentials.getPassword())) {
                return true;
            }
        }
        return false;

    }
*/

}