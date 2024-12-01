package com.utcn.scdproiect.Courier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
@RestController
@RequestMapping("/couriers")
public class CourierController {

    @Autowired
    private CourierService courierService;

    @GetMapping
    public List<Courier> getAllCouriers() {
        return courierService.getAllCouriers();
    }

    @GetMapping("/withoutPending")
    public List<Courier> getCouriersWithoutPending() {
        return courierService.getAllWithoutPendingPackages();
    }

    @GetMapping("/managers/deliveredCount")
    public List<Object[]> getManagersAndDeliveredCount() {
        return courierService.getAllManagersAndDeliveredCount();
    }

    @GetMapping("/managers/getAllManagersWithDeliveredPackages")
    public List<Courier> getAllManagersWithDeliveredPackages() {
        return courierService.getAllManagersWithDeliveredPackages();
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
    public ResponseEntity<Courier> getCourierById(@PathVariable Integer id) {
        Courier courier = courierService.getCourierById(id);

        if (courier != null) {

            return new ResponseEntity<>(courier, HttpStatus.OK);
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