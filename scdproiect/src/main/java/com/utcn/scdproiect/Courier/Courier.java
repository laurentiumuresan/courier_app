package com.utcn.scdproiect.Courier;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Courier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Builder.Default
    @Column()
    private boolean isManager=false;

    // Change manager field to an Integer for manager_id
    @Column(name = "manager_id")
    private Integer managerId;

    // Optional: List of subordinates for a given manager
    @OneToMany(mappedBy = "managerId", cascade = CascadeType.ALL)
    private List<Courier> subordinates;
}
