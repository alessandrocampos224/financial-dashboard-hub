import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { carrierId } = await req.json()
    console.log('Iniciando exclusão da transportadora:', carrierId)

    // Primeiro verifica se a transportadora existe
    const { data: carrier, error: fetchError } = await supabase
      .from('carriers')
      .select('*')
      .eq('id', carrierId)
      .single()

    if (fetchError) {
      console.error('Erro ao buscar transportadora:', fetchError)
      throw new Error('Transportadora não encontrada')
    }

    // Soft delete da transportadora
    const { error: deleteError } = await supabase
      .from('carriers')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', carrierId)

    if (deleteError) {
      console.error('Erro ao excluir transportadora:', deleteError)
      throw deleteError
    }

    return new Response(JSON.stringify(carrier), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Erro na função:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})