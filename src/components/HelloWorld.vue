<template>
  <v-container>
  <v-row>
    <div class="container-title">
      <h1>NutriOlla</h1>
      <p>Calculadora nutricional peruana</p>
    </div>
  </v-row>
  <v-row>
    <v-col
      cols="12"
      sm="8"
      md="7"
      class="alimentos"
    >
      <h2>¿Qué comistes hoy?</h2>
      <p>Puedes agregar o editar tus alimentos</p>
      <v-card 
        class="card mx-auto"
        max-width="100%"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1" style="font-size:1em !important;display:flex;justify-content:space-between;">
              Desayuno 
              <v-btn small color="success" @click="addAlimento('desayuno')"><v-icon>add_box</v-icon></v-btn></v-list-item-title>
            <div>
              <v-row v-for="cAd in cantidadAlimentosDesayuno"
              :key="cAd.key"
              >
                <v-col
                :cols="5"
                >
                  <v-select 
                    class="font"
                    :items="alimentos1"
                    item-text="Nombre"
                    item-value="Id"
                    label="Alimento"
                    @change="changeAlimento('desayuno',cAd.key,$event)"          
                  ></v-select>
                </v-col>
                <v-col
                :cols="2"
                >
                  <v-text-field 
                    label="Unidad"
                    class="font"
                    value="0"               
                  >
                  </v-text-field>
                </v-col>
                <v-col
                :cols="5"
                >
                  <div class="circle tipo_alimento">{{cAd.alimento.GrupoAlimenticio}}</div>
                </v-col>
              </v-row>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="4"
      md="5"
    >
    <div
      class="resultados"
    >
      <div>
        <h2>Resultados</h2>
      </div>
      <div>
        <v-row>
          <v-col>
            <v-select 
              class="font"
              :items="sexos"
              item-text="Descripcion"
              item-value="Id"
              v-model="selectedSexo"
              label="Sexo"
              ></v-select>
          </v-col>
          <v-col>
            <v-select 
              yclass="font"
              :items="rangoEdades"
              item-text="Descripcion"
              item-value="Id"
              label="Rango Edad"
              v-model="selectedRangoEdad"          
            ></v-select>
          </v-col>
        </v-row>
      </div>
    </div>
    <div>
      <p>Estos son los alimentos de tu alintención diaria basados en tu edady sexo.</p>
    </div>
    <div>
      <v-row>
        <v-col
          :cols="8"
          >
        <div  class="container_grupo_alimenticio">
          <div></div>
          <div>CEREALES, TUBÉRCULOS Y LUGUMINOSAS</div>
        </div>
        </v-col>
        <v-col
            :cols="4"
        >
            <div class="circle">CORRECTO</div>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row>
        <v-col
        :cols="8"
        >
          <div class="container_grupo_alimenticio">
            <div></div>
            <div >FRUTAS</div>
          </div>
        </v-col>
        <v-col
          :cols="4"
        >
          <div class="circle">CORRECTO</div>
        </v-col>
      </v-row>
    </div>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {

  data(){
    return {
      sexos: [],
      rangoEdades:[],
      cantidadAlimentosDesayuno:[],
      alimentos1:[],
      selectedSexo:0,
      selectedRangoEdad:0
    }
  },
  methods:{
    getGruposNutricionales: function () {    
      var vm = this;
      axios.get("https://calculadoranutricional.herokuapp.com/api/consumo-estimado",{
              params: {
                idSexo: vm.selectedSexo,
                idRangoEdad:vm.selectedRangoEdad
              }
      })
      .then(function(res){
        vm.gruposNutricionales = res.data.data;
        vm.Kcal = res.data.data.kcalEstimado;
      })
    },
    changeAlimento: function(pTipo,pKey,value){
      var vm = this;
      if(pTipo=="desayuno"){

        let alimentos = vm.alimentos1;
        let alimentosDesayuno = vm.cantidadAlimentosDesayuno;
        console.log("Alimentos Desayuno =>",alimentosDesayuno);
        if(alimentosDesayuno.length > 1){
          let flag= true;

          for(let i=0;i<alimentosDesayuno.length;i++){
              if(alimentosDesayuno[i].alimento.Id == value){
                flag=false;
                break;
              }             
          }

          if(flag){
            for(let i=0;i<alimentos.length;i++){
              if(alimentos[i].Id == value){
                for(let j=0;j<alimentosDesayuno.length;j++){
                  if(alimentosDesayuno[j].key == pKey){
                    alimentosDesayuno[j].alimento = alimentos[i];
                    break;
                  }
                }
                break;
              }
            }
          }else{
            alert("No puede escoger un mismo alimento");
            return false;
          }


        }else{
          for(let i=0;i<alimentos.length;i++){
            if(alimentos[i].Id==value){
              for(let j=0;j<alimentosDesayuno.length;j++){
                if(alimentosDesayuno[j].key == pKey){
                  alimentosDesayuno[j].alimento = alimentos[i];
                  break;
                }
              }
              break;
            }
          }
        }
      }
    },
    addAlimento: function(tipo){
      var vm = this;
      if(tipo=="desayuno"){
        let key = Math.random() * (100000 - 1) + 1;
        vm.cantidadAlimentosDesayuno.push({key:key,alimento:{}});
      }         
    }
  },
  mounted(){

    let self = this;

    axios.get("https://calculadoranutricional.herokuapp.com/api/sexos")
    .then(function(res){
      self.sexos = res.data;
    })
    .catch(function(err){
      alert(err);
    })

    axios.get("https://calculadoranutricional.herokuapp.com/api/rango-edades")
    .then(function(res){
      self.rangoEdades = res.data.data;
    })
    .catch(function(err){
      alert(err);
    });

    axios.get("https://calculadoranutricional.herokuapp.com/api/alimentos")
      .then(function(res){
        self.alimentos1 = res.data.data;
      });
  }
}

</script>
