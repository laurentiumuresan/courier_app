package com.utcn.scdproiect.Courier;

import com.utcn.scdproiect.Dto.CourierDTO;
import com.utcn.scdproiect.Dto.CourierLoginDTO;
import com.utcn.scdproiect.Pkg.Package;
import com.utcn.scdproiect.Pkg.PackageRepository;
import com.utcn.scdproiect.Pkg.PackageStatus;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
        // Initialize delivered count
        Long deliveredCount = 0L;

        // Get the manager's information
        Courier manager = courierRepository.findById(managerId).orElse(null);
        if (manager != null) {
            // Count delivered packages for the manager
            List<com.utcn.scdproiect.Pkg.Package> managerPackages = packageRepository.findDeliveredPackagesByCourierId(manager.getId());
            deliveredCount += managerPackages.size();

            List<CourierDTO> subordinates = manager.getSubordinates().stream()
                    .map(courier -> new CourierDTO(
                            courier.getId(),
                            courier.getName(),
                            courier.getEmail(),
                            manager.getId(), // Set manager ID as manager's ID
                            Collections.emptyList() // Empty list for subordinates
                    ))
                    .collect(Collectors.toList());

            // Count delivered packages for each direct subordinate
            for (CourierDTO subordinate : subordinates) {
                List<Package> subordinatePackages = packageRepository.findDeliveredPackagesByCourierId(subordinate.getId());
                deliveredCount += subordinatePackages.size();
            }

            // Create response map
            Map<String, Object> response = new HashMap<>();
            response.put("managerId", manager.getId());
            response.put("managerName", manager.getName());
            response.put("deliveredCount", deliveredCount);
            response.put("subordinates", subordinates);

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


}