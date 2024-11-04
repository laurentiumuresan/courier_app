package com.utcn.scdproiect.Dto;

import com.utcn.scdproiect.Courier.Courier;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourierDTO {

        private Integer id;

        private String name;

        private String email;

        private Integer managerId;

        private List<Courier> subordinates;
}
