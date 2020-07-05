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
              <v-btn small color="success" @click="addAlimento('desayuno')"><v-icon>add_box</v-icon></v-btn>
            </v-list-item-title>
            <div>
              <v-row v-for="cAd in cantidadAlimentosDesayuno"
              :key="cAd.key"
              >
                <v-col
                :cols="5"
                >
                  <v-select 
                    class="font"
                    :items="alimentos"
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
                    @focus="focusUnidad(cAd.key,$event)"
                    @blur="blurUnidad(cAd.key,$event)"               
                  >
                  </v-text-field>
                </v-col>
                <v-col
                :cols="5"
                >
                  <div class="circle circle-correcto tipo_alimento">{{cAd.alimento.GrupoAlimenticio}}</div>
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
          <v-col>
            <v-btn small color="success" @click="getGruposNutricionales()">Buscar</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
    <div>
      <p>Estos son los alimentos de tu alintención diaria basados en tu edady sexo.</p>
    </div>
    <div v-for="gn in gruposNutricionales"
              :key="gn.idgrupoAlimenticio">
      <v-row>
        <v-col
          :cols="8"
          >
        <div  class="container_grupo_alimenticio">
          <div></div>
          <div>{{gn.nombreGrupoAlimenticio}}</div>
        </div>
        </v-col>
        <v-col
            :cols="4"
            v-if="gn.idgrupoAlimenticio == 1"
        >
            <div class="circle circle-bajo" v-if="g1 < gn.CantidadPorcionesEstimado" >BAJO</div>
            <div class="circle circle-correcto" v-if="g1 == gn.CantidadPorcionesEstimado" >CORRECTO</div>
            <div class="circle circle-alto" v-if="g1 > gn.CantidadPorcionesEstimado" >ALTO</div>
        </v-col>

        <v-col
            :cols="4"
            v-if="gn.idgrupoAlimenticio == 2"
        >
            <div class="circle circle-bajo" v-if="g2 < gn.CantidadPorcionesEstimado" >BAJO</div>
            <div class="circle circle-correcto" v-if="g2 == gn.CantidadPorcionesEstimado" >CORRECTO</div>
            <div class="circle circle-alto" v-if="g2 > gn.CantidadPorcionesEstimado" >ALTO</div>
        </v-col>

                <v-col
            :cols="4"
            v-if="gn.idgrupoAlimenticio == 3"
        >
            <div class="circle circle-bajo" v-if="g3 < gn.CantidadPorcionesEstimado" >BAJO</div>
            <div class="circle circle-correcto" v-if="g3 == gn.CantidadPorcionesEstimado" >CORRECTO</div>
            <div class="circle circle-alto" v-if="g3 > gn.CantidadPorcionesEstimado" >ALTO</div>
        </v-col>

        <v-col
            :cols="4"
            v-if="gn.idgrupoAlimenticio == 4"
        >
            <div class="circle circle-bajo" v-if="g4 < gn.CantidadPorcionesEstimado" >BAJO</div>
            <div class="circle circle-correcto" v-if="g4 == gn.CantidadPorcionesEstimado" >CORRECTO</div>
            <div class="circle circle-alto" v-if="g4 > gn.CantidadPorcionesEstimado" >ALTO</div>
        </v-col>

                <v-col
            :cols="4"
            v-if="gn.idgrupoAlimenticio == 5"
        >
            <div class="circle circle-bajo" v-if="g5 < gn.CantidadPorcionesEstimado" >BAJO</div>
            <div class="circle circle-correcto" v-if="g5 == gn.CantidadPorcionesEstimado" >CORRECTO</div>
            <div class="circle circle-alto" v-if="g5 > gn.CantidadPorcionesEstimado" >ALTO</div>
        </v-col>

        <v-col
            :cols="4"
            v-if="gn.idgrupoAlimenticio == 6"
        >
            <div class="circle circle-bajo" v-if="g6 < gn.CantidadPorcionesEstimado" >BAJO</div>
            <div class="circle circle-correcto" v-if="g6 == gn.CantidadPorcionesEstimado" >CORRECTO</div>
            <div class="circle circle-alto" v-if="g6 > gn.CantidadPorcionesEstimado" >ALTO</div>
        </v-col>
        <v-col
            :cols="4"
            v-if="gn.idgrupoAlimenticio == 7"
        >
            <div class="circle circle-bajo" v-if="g7 < gn.CantidadPorcionesEstimado" >BAJO</div>
            <div class="circle circle-correcto" v-if="g7 == gn.CantidadPorcionesEstimado" >CORRECTO</div>
            <div class="circle circle-alto" v-if="g7 > gn.CantidadPorcionesEstimado" >ALTO</div>
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
      alimentos:[],
      cantidadAlimentosDesayuno:[],
      selectedSexo:0,
      selectedRangoEdad:0,
      gruposNutricionales:[],
      g1:0,
      g2:0,
      g3:0,
      g4:0,
      g5:0,
      g6:0,
      g7:0,
      auxUnidad:0,
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
        vm.gruposNutricionales = res.data.data.consumoEstimado;
      })
    },
    changeAlimento: function(pTipo,pKey,value){

      var vm = this;
      let alimentos = vm.alimentos;
      let alimentosDesayuno = vm.cantidadAlimentosDesayuno;

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
    },
    focusUnidad:function(key,event){
      var vm = this;
      vm.auxUnidad = event.target.value;
      console.log("Unidad =>"+event.target.value)
    },
    blurUnidad:function(key,event){
      console.log("KEY =>",key);
      console.log("KEY =>",event.target.value);
      var vm = this;

      let array = vm.cantidadAlimentosDesayuno;
      let unidad = parseInt(event.target.value);
      
      for(let i=0;i<array.length;i++){
        if(array[i].key == key){
          console.log(array[i]['alimento']); 
          let alimento = array[i]['alimento'];
          if(alimento.IdGrupoAlimenticio==1){
            vm.g1+=unidad-vm.auxUnidad;
          }else if(alimento.IdGrupoAlimenticio==2){
            vm.g2+=unidad-vm.auxUnidad;
          }else if(alimento.IdGrupoAlimenticio==3){
            vm.g3+=unidad-vm.auxUnidad;
          }else if(alimento.IdGrupoAlimenticio==4){
            vm.g4+=unidad-vm.auxUnidad;
          }else if(alimento.IdGrupoAlimenticio==5){
            vm.g5+=unidad-vm.auxUnidad;
          }else if(alimento.IdGrupoAlimenticio==6){
            vm.g6+=unidad-vm.auxUnidad;
          }else if(alimento.IdGrupoAlimenticio==7){
            vm.g7+=unidad-vm.auxUnidad;
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
        self.alimentos = res.data.data;
      });
  }
}

</script>
