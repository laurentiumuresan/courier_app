package com.utcn.scdproiect.Dto;

import com.utcn.scdproiect.Courier.Courier;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourierDTO {

        private Integer id;

        private String name;

        private String email;

        private Integer managerId;

        private List<Courier> subordinates;
}
