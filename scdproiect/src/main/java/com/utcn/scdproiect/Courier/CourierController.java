package com.utcn.scdproiect.Courier;
import com.utcn.scdproiect.Dto.CourierDTO;
import com.utcn.scdproiect.Dto.CourierLoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
@RestController
@RequestMapping("/couriers")
public class CourierController {

    @Autowired
    private CourierService courierService;

    @GetMapping
    public List<CourierDTO> getAllCouriers() {

        return courierService.getAllCouriers().stream().map(courier -> new CourierDTO(
                        courier.getId(),
                        courier.getName(),
                        courier.getEmail(),
                        courier.getManagerId() != null ? courier.getManagerId() : null,
                        courier.getSubordinates()  // Assuming subordinates is a collection
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/withoutPending")
    public List<CourierDTO> getCouriersWithoutPending() {
        return courierService.getAllWithoutPendingPackages().stream().map(courier -> new CourierDTO(
                        courier.getId(),
                        courier.getName(),
                        courier.getEmail(),
                        courier.getManagerId() != null ? courier.getManagerId() : null,
                        courier.getSubordinates()  // Assuming subordinates is a collection
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/managers/deliveredCount")
    public List<Object[]> getManagersAndDeliveredCount() {
        return courierService.getAllManagersAndDeliveredCount();
    }

    @GetMapping("/managers/getAllManagersWithDeliveredPackages")
    public List<CourierDTO> getAllManagersWithDeliveredPackages() {
        return courierService.getAllManagersWithDeliveredPackages().stream()
                .map(courier -> new CourierDTO(
                        courier.getId(),
                        courier.getName(),
                        courier.getEmail(),
                        courier.getManagerId() != null ? courier.getManagerId() : null,
                        courier.getSubordinates()  // Assuming subordinates is a collection
                ))
                .collect(Collectors.toList());
    }


    @GetMapping("/{managerId}/delivered-count")
    public Map<String, Object> getManagerWithDeliveredCount(@PathVariable Integer managerId) {
        return courierService.getManagerWithDeliveredCount(managerId);
    }

    @PostMapping("/register")
    public ResponseEntity<Courier> createCourier(@RequestBody Courier courier) {
        try {
            // Validate the managerId if necessary
            if (courier.getManagerId() != null && !isValidManagerId(courier.getManagerId())) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            Courier savedCourier = courierService.createCourier(courier);
            return new ResponseEntity<>(savedCourier, HttpStatus.CREATED);
        } catch (Exception e) {
            // Log the exception message
            System.out.println("Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Courier> updateCourier(@PathVariable Integer id, @RequestBody Courier updatedCourier) {
        Courier courier = courierService.updateCourier(id, updatedCourier);
        return ResponseEntity.ok(courier);
    }


    @DeleteMapping("/{id}")
    public void deleteCourier(@PathVariable Integer id) {
        courierService.deleteCourier(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourierDTO> getCourierById(@PathVariable Integer id) {
        Courier courier = courierService.getCourierById(id);

        if (courier != null) {
            CourierDTO courierDTO = new CourierDTO(
                    courier.getId(),
                    courier.getName(),
                    courier.getEmail(),
                    courier.getManagerId() != null ? courier.getManagerId() : null,
                    courier.getSubordinates() // Assuming subordinates is a collection
            );
            return new ResponseEntity<>(courierDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Method to check if the managerId is valid
    private boolean isValidManagerId(Integer managerId) {
        // Check if the managerId exists among couriers
        List<Courier> allCouriers = courierService.getAllCouriers();
        return allCouriers.stream().anyMatch(c -> c.getId().equals(managerId));
    }
/*
    @PutMapping(value = "/login")
    public ResponseEntity<?> updateCourier(@RequestBody CourierLoginDTO courier) {
        return new ResponseEntity<>(courierService.login(courier), HttpStatus.OK);
    }
    */


}